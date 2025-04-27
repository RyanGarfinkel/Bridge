
import User from '@/models/User';

const createUser = async (auth0Id: string, firstName: string, lastName: string) => {

    const user = await User.create({auth0Id, firstName, lastName, hasCompletedSurvey: false});

    return user;
}

export default createUser;