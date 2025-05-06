'use client';

import CourseList from '@/components/CourseList';
import Loading from '@/components/Loading';
import SurveyPrompt from '@/components/SurveyPrompt';
import { useData } from '@/context/DataProvider';

const Dashboard = () => {

  const { user, isLoading } = useData();

  return (
    <>
      {
        isLoading ? (
          <Loading msg='Logging in...'/>
        ) : !user ? (
          <Loading msg='Fetching your courses...'/>
        ) : user.hasCompletedSurvey ? (
          <CourseList />
        ) : (
          <SurveyPrompt />
        )
      }
    </>
  )
};

export default Dashboard;
