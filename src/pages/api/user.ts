import type { NextApiRequest, NextApiResponse } from 'next';
import dbconnect from '@/lib/dbConnection';
import User, { IUser } from '@/models/User';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    const { auth0Id, firstname, lastname } = req.body;

    dbconnect();

    if(!auth0Id)
        return res.status(400).json({ error: 'Missing auth0Id.' });

    let user = await User.findOne({ auth0Id });

    if(!user)
        user = await User.create({ auth0Id: auth0Id, firstname: firstname, lastname: lastname });

    return res.status(200).json(user as IUser);
};

export default handler;
