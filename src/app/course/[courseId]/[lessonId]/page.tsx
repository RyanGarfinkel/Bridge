'use client';

import { useCourse } from "@/context/CourseProvider";
import { ICourse, ILesson } from "@/models/Course";
import { useState, useEffect } from "react";
import LessonView from "@/components/LessonView";
import QuestionView from "@/components/QuestionView";
import { useRouter } from "next/navigation";

interface LessonPageProps {
    params: Promise<{ courseId: string, lessonId: string }>;
}

const LessonPage: React.FC<LessonPageProps> = ({ params }) => {

    const router = useRouter();
    
    const { courses, completeLesson } = useCourse();
    const [course, setCourse] = useState<ICourse | null>(null);
    const [lesson, setLesson] = useState<ILesson | null>(null);
    const [isViewingContent, setIsViewingContent] = useState(true);

    useEffect(() => {

        params.then(({ courseId, lessonId }) => {

            const foundCourse = courses.find((c) => c._id === courseId);

            if(foundCourse)
            {
                setCourse(foundCourse);

                const foundLesson = foundCourse.lessons.find((l) => l.id === lessonId);

                if(foundLesson)
                    setLesson(foundLesson);
                else
                    console.error(`Lesson with ID ${lessonId} not found.`);
            }
            else
                console.error(`Course with ID ${courseId} not found.`);

        });
    }, [params, courses]);

    const completeQuestions = async () => {

        console.log('Completing questions...');
        completeLesson(course?._id as string, lesson?.id as string)
            .then(() => {
                console.log('Questions completed successfully.');
                router.push(`/course/${course?._id}`);
            });
    }

    return (
        <div className="relative w-full">
            { !course || !lesson ? (
                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <p className="text-lg text-gray-600">Loading...</p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <button onClick={() => window.history.back()} className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Return to Course
                    </button>
                    {
                        isViewingContent ? (
                            <LessonView lesson={lesson} />
                        ) : (
                            <QuestionView questions={lesson.questions} completeQuestions={completeQuestions} />
                        )
                    }
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <button
                            onClick={() => setIsViewingContent(!isViewingContent)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            {isViewingContent ? "View Questions" : "View Lesson"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LessonPage;
