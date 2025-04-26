import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
    auth0Id: string;
    firstname?: string;
    lastname?: string;
    hasCompletedSurvey: boolean;
}

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,
    },
    hasCompletedSurvey: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
export type { IUser };