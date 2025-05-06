import { IAnswer, IQuestion } from '@/models/Course';
import React, { useState } from 'react';
import { Button } from './ui/button';

interface QuestionViewProps {
    questions: IQuestion[];
    completeQuestions: () => Promise<void>;
}
const QuestionView: React.FC<QuestionViewProps> = ({ questions, completeQuestions }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleAnswerClick = (index: number) => {
        const isAnswerCorrect = questions[currentIndex].answers[index].isCorrect;
        setSelectedAnswer(index);
        setIsCorrect(isAnswerCorrect);
    };

    const handleNextQuestion = () => {

        if(!isCorrect)
            return;

        if(currentIndex < questions.length - 1)
            {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null);
            setIsCorrect(false);
        }
        else
            completeQuestions();
    };

    return (
        <div className='p-6 w-[800px] flex flex-col justify-center'>
            <p>
                Question {currentIndex + 1} of {questions.length}
            </p>
            <h2 className='text-2xl font-bold mb-4'>
                {questions[currentIndex].question}
            </h2>
            <ul className='space-y-2'>
                {
                    questions[currentIndex].answers.map((answer: IAnswer, index: number) => (
                        <li
                            key={index}
                            onClick={() => handleAnswerClick(index)}
                            className={`p-4 border rounded cursor-pointer relative overflow-hidden ${
                                selectedAnswer === index
                                    ? isCorrect
                                        ? 'text-white'
                                        : 'text-white'
                                    : 'bg-white hover:bg-gray-100'
                            }`}
                        >
                            <span
                                className={`absolute inset-0 transition-all duration-500 ${
                                    selectedAnswer === index
                                        ? isCorrect
                                            ? 'bg-green-500'
                                            : 'bg-red-500'
                                        : 'bg-transparent'
                                }`}
                                style={{
                                    transform:
                                        selectedAnswer === index ? 'scaleX(1)' : 'scaleX(0)',
                                    transformOrigin: 'left',
                                }}
                            ></span>
                            <span className='relative'>{answer.text}</span>
                        </li>
                    ))
                }
            </ul>
            <Button onClick={handleNextQuestion} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600' disabled={!isCorrect}>
                {currentIndex < questions.length - 1 ? 'Next Question' : 'Submit Answers'}
            </Button>
        </div>
    );
};

export default QuestionView;
