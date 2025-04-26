import type { NextApiRequest, NextApiResponse } from 'next';
import dbconnect from '@/lib/dbConnection';
import User, { IUser } from '@/models/User';
import prompts from '@/utils/prompts';
import createCourse from '@/utils/createCourse';
import Course, { ICourse } from '@/models/Course';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    const { auth0Id, firstname, lastname } = req.body;

    dbconnect();

    console.log('Auth0 ID:', auth0Id);
    console.log('First Name:', firstname);
    console.log('Last Name:', lastname);

    if(!auth0Id)
        return res.status(400).json({ error: 'Missing auth0Id.' });

    const user = await User.findOne({ auth0Id });

    if(!user)
    {
        await User.create({ auth0Id: auth0Id, firstname: firstname, lastname: lastname });
        prompts.forEach(async prompt => await createCourse(prompt, auth0Id));
    }

    const courses = await Course.find({ auth0Id });

    return res.status(200).json({
        user: user as IUser,
        courses: courses as ICourse[],
    });
};

export default handler;