import type { NextApiRequest, NextApiResponse } from 'next';
import dbconnect from '@/lib/dbConnection';
import User from '@/models/User';
import prompts from '@/utils/prompts';
import createCourse from '@/utils/createCourse';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    const { auth0Id, firstname, lastname } = req.body;

    dbconnect();

    if(!auth0Id)
        return res.status(400).json({ error: 'Missing required fields' });

    const user = await User.findOne({ auth0Id });

    if(!user)
    {
        await User.create({ auth0Id, firstname, lastname });
        prompts.forEach(async prompt => createCourse(prompt, auth0Id));
    }

    return res.status(200).send('holy shit it worked!!!');
};

export default handler;