import Course from '@/models/Course';
import User from '@/models/User';
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const createCourse = async (prompt: string, auth0Id: string) => {

    const user = await User.findOne({ auth0Id });
    if (!user) {
        throw new Error('User not found.');
    }

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
                                    description: 'The content of the lesson, which is text. Make sure it is roughly 100-200 words.',
                                },
                            },
                            required: ['title', 'description', 'content'],
                        },
                    },
                },
                required: ['title', 'lessons'],
            },
        }
    });

    const courseObj = JSON.parse(response.text || '');

    // Validate lessons to ensure content is present
    if (!courseObj.lessons || !Array.isArray(courseObj.lessons)) {
        throw new Error('Invalid lessons format.');
    }

    courseObj.lessons.forEach((lesson: { title: string; description: string; content: string }, index: number) => {
        if (!lesson.content) {
            throw new Error(`Lesson ${index} is missing content.`);
        }
    });

    const course = await Course.create({
        title: courseObj.title,
        isCompleted: false,
        user: user._id,
        lessons: courseObj.lessons.map((lesson: { title: string; description: string; content: string }) => ({
            title: lesson.title,
            isCompleted: false,
            description: lesson.description,
            content: lesson.content,
        })),
    });

    return course;
};

export default createCourse;