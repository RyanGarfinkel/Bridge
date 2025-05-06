import { ILesson } from "@/models/Course";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LessonViewProps {
    lesson: ILesson;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{lesson.description}</p>
            <div className="markdown flex flex-col justify-start">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {lesson.content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default LessonView;