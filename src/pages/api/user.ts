import type { NextApiRequest, NextApiResponse } from 'next';
import dbconnect from '@/lib/dbConnection';
import User, { IUser } from '@/models/User';
import prompts, { unitTitles } from '@/utils/prompts';
import createCourse from '@/utils/createCourse';
import Course, { ICourse } from '@/models/Course';
import Survey, { ISurvey } from '@/models/Survey';
import pLimit from 'p-limit';

const retryWithBackoff = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
    while (retries > 0) {
        try {
            return await fn();
        } catch (error: any) {
            if (error.message.includes('429')) {
                console.warn(`Rate limit exceeded. Retrying in ${delay / 1000}s...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
                retries--;
                delay *= 2; // Exponential backoff
            } else {
                throw error;
            }
        }
    }
    throw new Error('Failed after multiple retries.');
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    const { auth0Id, firstname, lastname } = req.body;

    dbconnect();

    if(!auth0Id)
        return res.status(400).json({ error: 'Missing auth0Id.' });

    const user = await User.findOne({ auth0Id });

    if(!user)
    {
        await User.create({ auth0Id: auth0Id, firstname: firstname, lastname: lastname });
        
        const limit = pLimit(2);

        await Promise.all(
            prompts.map((prompt, i) =>
                limit(() =>
                    retryWithBackoff(() => createCourse(unitTitles[i], prompt, auth0Id))
                )
            )
        );

        await Survey.create({ auth0Id: auth0Id });
    }

    const courses = await Course.find({ auth0Id });
    const survey = await Survey.findOne({ auth0Id });

    return res.status(200).json({
        user: user as IUser,
        courses: courses as ICourse[],
        survey: survey as ISurvey
    });
};

export default handler;