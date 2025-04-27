import prompts from './prompts';
import createCourse from './createCourse';
import User from '@/models/User';

const createUser = async (auth0Id: string, firstName: string, lastName: string) => {

    const user = await User.create({auth0Id, firstName, lastName, hasCompletedSurvey: false})

    prompts.forEach(async (prompt) => createCourse(prompt, user.auth0Id));

    return user;
}

export default createUser;