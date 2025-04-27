import Course, { ILesson, IQuestion, IAnswer } from '@/models/Course';
import { GoogleGenAI, Type } from '@google/genai';
import { lessonContent } from './prompts';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const createLesson = async (title: string) => {

    const prompt = 'Create a lesson description and content for the following title: ' + title + '. The content should be detailed and should teach the student about the topic. 500-600 words for the content.';

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    description: { type: Type.STRING },
                    content: { type: Type.STRING },
                },
                required: ['description', 'content'],
            },
        }
    });

    const lessonObj = JSON.parse(response.text || '');
    if (!lessonObj.description || !lessonObj.content)
        throw new Error('Invalid lesson format.');

    const lessonDescContent = {
        description: lessonObj.description,
        content: lessonObj.content,
    };

    const questions = await createQuestion(title, lessonDescContent.content);

    const lesson: ILesson = {
        title: title,
        isCompleted: false,
        description: lessonDescContent.description,
        content: lessonDescContent.content,
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

const createQuestion = async (title: string, content: string) => {

    const prompt = 'Create a question for the following content: ' + content + '. The title of the lesson is ' + title + '. The question should be related to the content and should have 4 possible answers, one of which is correct.';
    console.log('bout to make question');
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

    console.log('finished making a question');

    return questions.map((question: IQuestion) => ({
        question: question.question,
        answers: question.answers.map((answer: IAnswer) => ({
            text: answer.text,
            isCorrect: answer.isCorrect,
        })),
    }));
}

const createCourse = async (title: string, lessons: string[], auth0Id: string) => {

    console.log('bout to make course');
    const lessonsGenerated = [];
    for (const lessonTitle of lessons)
    {
        lessonsGenerated.push(await createLesson(lessonTitle));
    }

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