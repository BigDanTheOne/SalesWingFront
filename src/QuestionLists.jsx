import React from 'react';
import './QuestionLists.css'; // Make sure to create a corresponding CSS file for styling

// Mock data for the list of questions - replace with real data as needed
const sectionsData = [
    {
        title: 'Answered Questions',
        questions: ['Question 1', 'Question 2', 'Question 3']
    },
    {
        title: 'Recommended',
        questions: ['Question 4', 'Question 5', 'Question 6'],
        premium: true
    },
    {
        title: 'Community Favorites',
        questions: ['Question 7', 'Question 8', 'Question 9']
    },
    {
        title: 'Essentials',
        questions: ['Question 10', 'Question 11', 'Question 12']
    }
];

const QuestionLists = () => {
    return (
        <div className="question-lists">
            {sectionsData.map((section, index) => (
                <QuestionSection
                    key={index}
                    title={section.title}
                    questions={section.questions}
                    premium={section.premium}
                />
            ))}
        </div>
    );
};

const QuestionSection = ({ title, questions, premium }) => {
    return (
        <div className="question-section">
            <h2>{title}{premium && <span className="premium-badge">Premium</span>}</h2>
            <ul className="question-list">
                {questions.map((question, index) => (
                    <li key={index} className="question-item">{question}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionLists;
