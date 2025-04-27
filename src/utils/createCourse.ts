import Course, { ILesson, IQuestion, IAnswer } from '@/models/Course';
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const createLesson = async (title: string, surveyResponses: string) => {

    const prompt = 'Create a lesson description and content for the following title: ' +  '. The content should be detailed and should teach the student about the topic. 500-600 words for the content. Here are survey responses you should incorporate into the content to make it more interesting based on their personality, study habits, and interests: ' + surveyResponses;

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.STRING,
                description: 'Provide as normal text.',
            },
        }
    });

    const content = response.text || '';

    const questions = await createQuestions(content);

    const lesson: ILesson = {
        title: title,
        isCompleted: false,
        content: content,
        questions: questions.map((question: IQuestion) => ({
            question: question.question,
            answers: question.answers.map((answer: IAnswer) => ({
                text: answer.text,
                isCorrect: answer.isCorrect,
            })),
        })),
    };

    return lesson;
}

const createQuestions = async (content: string) => {

    const prompt = 'Create a question for the following content: ' + content + '. The questions should be related to the content and should have 4 possible answers, one of which is correct.';
    console.log('bout to make questions');
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        answers: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    text: { type: Type.STRING },
                                    isCorrect: { type: Type.BOOLEAN },
                                },
                                required: ['text', 'isCorrect'],
                            },
                            description: 'An array of 4 answers, one of which is correct.',
                        },
                    },
                    required: ['question', 'answers'],
                },
                minItems: '4',
            },
        }
    });

    const questions = JSON.parse(response.text || '');

    console.log('finished making questions');

    return questions.map((question: IQuestion) => ({
        question: question.question,
        answers: question.answers.map((answer: IAnswer) => ({
            text: answer.text,
            isCorrect: answer.isCorrect,
        })),
    }));
}

const createCourse = async (title: string, lessons: string[], surveyResponses: string, auth0Id: string) => {

    console.log('bout to make course');
    const lessonsGenerated = [];
    for (const lessonTitle of lessons)
        lessonsGenerated.push(await createLesson(lessonTitle, surveyResponses));

    const course = await Course.create({
        title: title,
        isCompleted: false,
        auth0Id: auth0Id,
        lessons: lessonsGenerated,
    });

    console.log('Created course:');

    return course;


    // const response = await ai.models.generateContent({
    //     model: 'gemini-2.0-flash',
    //     contents: prompt,
    //     config: {
    //         responseMimeType: 'application/json',
    //         responseSchema: {
    //             type: Type.OBJECT,
    //             properties: {
    //                 title: { type: Type.STRING },
    //                 lessons: {
    //                     type: Type.ARRAY,
    //                     items: {
    //                         type: Type.OBJECT,
    //                         properties: {
    //                             title: { type: Type.STRING },
    //                             description: { type: Type.STRING },
    //                             content: {
    //                                 type: Type.STRING,
    //                                 description: 'Provide detailed content of the lesson. It should teach the student about the topic. 500-600 words.',
    //                             },

    //                             questions: {
    //                                 type: Type.ARRAY,
    //                                 items: {
    //                                     type: Type.OBJECT,
    //                                     properties: {
    //                                         question: { type: Type.STRING },
    //                                         answers: {
    //                                             type: Type.ARRAY,
    //                                             items: {
    //                                                 type: Type.OBJECT,
    //                                                 properties: {
    //                                                     text: { type: Type.STRING },
    //                                                     isCorrect: { type: Type.BOOLEAN },
    //                                                 },
    //                                                 required: ['text', 'isCorrect'],
    //                                             },
    //                                             description: 'An array of 4 answers, one of which is correct.',
    //                                         },
    //                                     },
    //                                     required: ['question', 'answers'],
    //                                 },
    //                                 minItems: '4',
    //                             },
    //                         },
    //                         required: ['title', 'description', 'content', 'questions'],
    //                     },
    //                 },
    //             },
    //             required: ['title', 'lessons'],
    //         },
    //     }
    // });

    // const courseObj = JSON.parse(response.text || '');

    // if (!courseObj.lessons || !Array.isArray(courseObj.lessons))
    //     throw new Error('Invalid lessons format.');

    // courseObj.lessons.forEach((lesson: ILesson, index: number) => {
    //     if (!lesson.content)
    //         throw new Error(`Lesson ${index} is missing content.`);
    // });

    // console.log('Course object:', courseObj.lessons[0]);

    // const course = await Course.create({
    //     title: courseObj.title,
    //     isCompleted: false,
    //     auth0Id: auth0Id,
    //     lessons: courseObj.lessons.map((lesson: ILesson) => ({
    //         title: lesson.title,
    //         isCompleted: false,
    //         description: lesson.description,
    //         content: lesson.content,
    //         questions: lesson.questions.map((question: IQuestion) => ({
    //             question: question.question,
    //             answers: question.answers.map((answer: IAnswer) => ({
    //                 text: answer.text,
    //                 isCorrect: answer.isCorrect,
    //             })),
    //         })),
    //     })),
    // });

    // console.log('Created course:', course);

    // return course;
};

export default createCourse;