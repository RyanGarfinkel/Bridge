import mongoose, { Document } from "mongoose";

interface IUser extends Document {
    auth0Id: string;
    firstName?: string;
    lastName?: string;
    hasCompletedSurvey: boolean;
}

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    hasCompletedSurvey: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
export type { IUser };