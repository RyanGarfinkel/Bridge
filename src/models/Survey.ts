import mongoose, { Document } from 'mongoose';

interface ISurvey extends Document {
    auth0Id: string;
    name?: string;
    birthDate?: string;
    location?: string;
    pronouns?: string;
    pets?: string;
    university?: string;
    studyPlan?: string;
    explanationPreference?: string;
    studyTools?: string[];
    roadblockSolution?: string;
    coachStyle?: string;
    studyPartner?: string;
    studyVoice?: string;
    unwind?: string;
    hobbies?: string;
    holiday?: string;
    comfort?: string;
    studyBuddy?: string;
    favoriteShows?: string;
    favoriteGame?: string;
    dinnerGuest?: string;
    travelDestination?: string;
    instantSkill?: string;
}

const surveySchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: false,
    },
    birthDate: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    pronouns: {
        type: String,
        required: false,
    },
    pets: {
        type: String,
        required: false,
    },
    university: {
        type: String,
        required: false,
    },
    studyPlan: {
        type: String,
        required: false,
    },
    explanationPreference: {
        type: String,
        required: false,
    },
    studyTools: {
        type: [String],
        required: false,
    },
    roadblockSolution: {
        type: String,
        required: false,
    },
    coachStyle: {
        type: String,
        required: false,
    },
    studyPartner: {
        type: String,
        required: false,
    },
    studyVoice: {
        type: String,
        required: false,
    },
    unwind: {
        type: String,
        required: false,
    },
    hobbies: {
        type: String,
        required: false,
    },
    holiday: {
        type: String,
        required: false,
    },
    comfort: {
        type: String,
        required: false,
    },
    studyBuddy: {
        type: String,
        required: false,
    },
    favoriteShows: {
        type: String,
        required: false,
    },
    favoriteGame: {
        type: String,
        required: false,
    },
    dinnerGuest: {
        type: String,
        required: false,
    },
    travelDestination: {
        type: String,
        required: false,
    },
    instantSkill: {
        type: String,
        required: false,
    },
});

const Survey = mongoose.models.Survey || mongoose.model<ISurvey>('Survey', surveySchema);

export default Survey;
export type { ISurvey };