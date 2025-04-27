import Course, { ILesson, IQuestion } from '@/models/Course';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const createLesson = async (title: string, surveyResponses: string): Promise<ILesson> => {
    const prompt = `Write a detailed and engaging lesson on the topic "${title}". Use the following survey responses to make the lesson more personalized: ${surveyResponses}. The lesson should be clear, easy to understand, and around 500-600 words. Format the lesson in Markdown, using **bold**, *italics*, and other Markdown features where appropriate. Add emojis where they enhance the content (e.g., 🎉 for excitement, 📚 for learning).`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            responseMimeType: 'text/plain',
        },
    });

    const content = (response.text || '').replace(/\\n/g, '\n').trim();

    const questions = await createQuestions(content);

    return {
        title: title.split('-')[0],
        isCompleted: false,
        content: content,
        questions,
    };
};

const createQuestions = async (content: string): Promise<IQuestion[]> => {
    const prompt = `Based on the following lesson content: "${content}", generate exactly 4 multiple-choice questions. Each question must have:
    
    1. A clear and concise question.
    2. Exactly 4 answer options labeled as "a)", "b)", "c)", and "d)".
    3. Only one correct answer, clearly marked with "✅ Correct Answer: [Correct answer letter]".

    Format the output in Markdown like this:

    **Question 1:** [Your question here]  
    - a) [Answer 1]  
    - b) [Answer 2]  
    - c) [Answer 3]  
    - d) [Answer 4]  
    ✅ **Correct Answer:** [Correct answer letter]

    Ensure the correct answer is accurate and corresponds to one of the provided options.`;

    console.log('Generating questions...');
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            responseMimeType: 'text/plain',
        },
    });

    const questionsText = (response.text || '').replace(/\\n/g, '\n').trim();
    console.log('Finished generating questions.');

    return parseQuestions(questionsText);
};

const parseQuestions = (questionsText: string): IQuestion[] => {
    const questions: IQuestion[] = [];
    const questionBlocks = questionsText.split('Question ').slice(1);

    for (const block of questionBlocks) {
        const lines = block.split('\n').map((line) => line.trim());
        const questionLine = lines[0];
        const answers = lines.slice(1, 5).map((line) => ({
            text: line.slice(3).trim(),
            isCorrect: false,
        }));
        const correctAnswerLine = lines[5];
        const correctAnswerLetter = correctAnswerLine.split(':')[1].trim();

        const correctIndex = correctAnswerLetter.charCodeAt(0) - 'a'.charCodeAt(0);
        if (answers[correctIndex]) {
            answers[correctIndex].isCorrect = true;
        }

        questions.push({
            question: questionLine,
            answers,
        });
    }

    return questions;
};

const createCourse = async (title: string, lessons: string[], surveyResponses: string, auth0Id: string) => {
    console.log('Starting course creation...');
    const lessonsGenerated: ILesson[] = [];

    for (const lessonTitle of lessons) {
        const lesson = await createLesson(lessonTitle, surveyResponses);
        lessonsGenerated.push(lesson);
    }

    const course = await Course.create({
        title: title,
        isCompleted: false,
        auth0Id: auth0Id,
        lessons: lessonsGenerated,
    });

    console.log('Course created successfully:', course.title);
    return course;
};

export default createCourse;