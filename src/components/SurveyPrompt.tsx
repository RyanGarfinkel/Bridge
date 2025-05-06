import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useData } from '@/context/DataProvider';

const SurveyPrompt = () => {

    const { user } = useData();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.location.href = '/survey';
    };

    if(!user)
        return null;

    return (
        <div className='flex justify-center items-center h-screen w-screen font-sans text-center bg-gray-50'>
            <Card className='w-full max-w-2xl p-8 shadow-lg'>
                <CardHeader>
                    <CardTitle className='text-5xl'>Welcome, {user.firstname} {user.lastname}! 👋</CardTitle>
                    <CardDescription className='text-2xl mt-2'>
                        Help us tailor the courses just for you 🎯
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='text-xl text-gray-600'>
                        Your input helps us create a personalized learning experience. It only takes a few minutes to complete.
                    </p>
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <Button variant='default' size='lg' className='px-8 py-4 text-xl' onClick={handleClick}>
                        Start Survey
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SurveyPrompt;