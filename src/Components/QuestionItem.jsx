import React from 'react';
import { StatusIndicator, TopicLabel, DifficultyTag, CategoryTag } from './UIComponents';
import './../Styles/QuestionItem.css'
const QuestionItem = ({ status, topic, difficulty, category }) => {
    return (
        <div className="question-item">
            <StatusIndicator completed={status} />
            <TopicLabel>{topic}</TopicLabel>
            <DifficultyTag difficulty={difficulty}>{difficulty}</DifficultyTag>
            <CategoryTag category={category}>{category}</CategoryTag>
        </div>
    );
};

export default QuestionItem;
