import mongoose, { Document } from 'mongoose';

interface IAnswer {
    text: string;
    isCorrect: boolean;
}

interface IQuestion {
    question: string;
    answers: IAnswer[];
}

interface ILesson {
    title: string;
    isCompleted: boolean;
    description: string;
    content: string;
    questions: IQuestion[];
}

interface ICourse extends Document {
    title: string;
    isCompleted: boolean;
    auth0Id: string;
    lessons: ILesson[];
}

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    auth0Id: { type: String, required: true },
    lessons: [
        {
            title: { type: String, required: true },
            isCompleted: { type: Boolean, default: false },
            description: { type: String, required: true },
            content: { type: String, required: true },
        },
    ],
});

const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);

export default Course;
export type { ICourse, ILesson };