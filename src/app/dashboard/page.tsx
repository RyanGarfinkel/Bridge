'use client';

import CourseList from '@/components/CourseList';
import SurveyPrompt from '@/components/SurveyPrompt';
import { useData } from '@/context/DataProvider';

const Dashboard = () => {

  const { user } = useData();

  if(user && user.hasCompletedSurvey)
    return <CourseList />;

  return <SurveyPrompt />;
};

export default Dashboard;
