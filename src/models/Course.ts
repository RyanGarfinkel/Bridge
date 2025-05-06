import mongoose from 'mongoose';

interface IAnswer {
    text: string;
    isCorrect: boolean;
}

interface IQuestion {
    question: string;
    answers: IAnswer[];
}

interface ILesson {
    id: string;
    title: string;
    isCompleted: boolean;
    description: string;
    content: string;
    questions: IQuestion[];
}

interface ICourse {
    _id: string;
    title: string;
    description: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    auth0Id: string;
    lessons: ILesson[];
}

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started', required: true },
    auth0Id: { type: String, required: true },
    lessons: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            isCompleted: { type: Boolean, default: false },
            description: { type: String, required: true },
            content: { type: String, required: true },
            questions: [
                {
                    question: { type: String, required: true },
                    answers: [
                        {
                            text: { type: String, required: true },
                            isCorrect: { type: Boolean, required: true },
                        },
                    ],
                },
            ],
        },
    ],
});

const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);

export default Course;
export type { ICourse, ILesson, IQuestion, IAnswer };