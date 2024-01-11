import React from 'react';
import QuestionItem from './QuestionItem';

const QuestionList = ({ questions }) => {
    return (
        <div>
            {questions.map((question) => (
                <QuestionItem key={question.id} {...question} />
            ))}
        </div>
    );
};
export default QuestionList;
