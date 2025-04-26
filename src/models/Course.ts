import mongoose, { Document } from 'mongoose';

interface ICourse extends Document {
    title: string;
    isCompleted: boolean;
    user: mongoose.Schema.Types.ObjectId;
    lessons: {
        title: string;
        isCompleted: boolean;
        description: string;
        content: string;
    }[];
}

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
export type { ICourse };