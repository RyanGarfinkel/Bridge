import Course, { ILesson } from '@/models/Course';
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const createCourse = async (prompt: string, auth0Id: string) => {

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    lessons: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                description: { type: Type.STRING },
                                content: {
                                    type: Type.STRING,
                                    description: 'The content of the lesson, which is text. Make sure it is roughly 800-1000 words.',
                                },
                                questions: {
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
                                },
                            },
                            required: ['title', 'description', 'content', 'questions'],
                        },
                    },
                },
                required: ['title', 'lessons'],
            },
        }
    });

    const courseObj = JSON.parse(response.text || '');

    if (!courseObj.lessons || !Array.isArray(courseObj.lessons))
        throw new Error('Invalid lessons format.');

    courseObj.lessons.forEach((lesson: ILesson, index: number) => {
        if (!lesson.content)
            throw new Error(`Lesson ${index} is missing content.`);
    });

    const course = await Course.create({
        title: courseObj.title,
        isCompleted: false,
        auth0Id: auth0Id,
        lessons: courseObj.lessons.map((lesson: ILesson) => ({
            title: lesson.title,
            isCompleted: false,
            description: lesson.description,
            content: lesson.content,
        })),
    });

    return course;
};

export default createCourse;