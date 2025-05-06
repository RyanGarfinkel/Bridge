import Course, { IAnswer, ILesson, IQuestion } from '@/models/Course';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const removeInvalidControlChars = (text: string) => {
    return text.replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
               .replace(/\\(?!["\\/bfnrtu])/g, '')
               .replace(/[\u2028\u2029]/g, '');
};

const createCourse = async (title: string, lessons: string[], surveyResponses: string, auth0Id: string) => {

    console.log('About to create course:', title);
    const prompt = `Create an engaging and personalized course. The topic is "${title}". Include the following lessons: ${lessons.join(', ')}. Use the survey responses: "${surveyResponses}" to personalize the content. For each lesson:
        Generate 4-5 questions.
        Make sure there is one answer for each question that is correct.
        Format the output as JSON like this:
        {
            "courseDescription": "[Brief course description]",
            "lessons": [
                {
                    "title": "[Apealing lesson title, may incliude emoji]",
                    "description": "[Brief lesson description (1 sentence)]",
                    "content": "[Lesson content (500-600 words). Include emojies to make more engaging. Use markdown syntax. Include code snippets and links if necessary. Use headings (ex. ## or ###). Escape special characters to ensure valid JSON.]",
                    "questions": [
                        {
                            "question": "[Question text]",
                            "answers": [
                                { "text": "[Answer 1]", "isCorrect": true/false },
                                { "text": "[Answer 2]", "isCorrect": true/false },
                                { "text": "[Answer 3]", "isCorrect": true/false },
                                { "text": "[Answer 4]", "isCorrect": true/false }
                            ]
                        }
                    ]
                }
            ]
        }`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
        },
    });

    const data = JSON.parse(removeInvalidControlChars(response.text || '{}'));

    if (!data.lessons || !Array.isArray(data.lessons))
        throw new Error('Invalid response from AI');

    const lessonsGenerated: ILesson[] = data.lessons.map((lesson: ILesson, i: number) => ({
        id: `${i + 1}`,
        title: lesson.title,
        description: lesson.description,
        isCompleted: false,
        content: lesson.content,
        questions: lesson.questions.map((question: IQuestion) => ({
            question: question.question,
            answers: question.answers.map((answer: IAnswer) => ({
                text: answer.text,
                isCorrect: answer.isCorrect,
            })),
        })),
    }));

    const course = await Course.create({
        title: title,
        description: data.courseDescription,
        status: 'Not Started',
        auth0Id: auth0Id,
        lessons: lessonsGenerated,
    });

    console.log('Course created:', course.title);

    return course;
};

export default createCourse;
