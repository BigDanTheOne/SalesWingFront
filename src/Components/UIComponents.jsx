import React from 'react';
import styled from 'styled-components';

// Styled components for various UI elements
const Status = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.completed ? 'green' : 'grey'};
  margin-right: 10px;
`;

const Topic = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const Tag = styled.span`
  padding: 5px 10px;
  border-radius: 15px;
  color: white;
  margin-right: 10px;
  font-size: 0.8em;

  &.easy {
    background-color: #2ecc71;
  }
  &.medium {
    background-color: #f1c40f;
  }
  &.hard {
    background-color: #e74c3c;
  }
`;

const Category = styled(Tag)`
  &.behavioral {
    background-color: #3498db;
  }
  &.situational {
    background-color: #9b59b6;
  }
  &.valueBased {
    background-color: #34495e;
  }
`;

// Functional Stateless Components
export const StatusIndicator = ({ completed }) => {
    return <Status completed={completed} />;
};

export const TopicLabel = ({ children }) => {
    return <Topic>{children}</Topic>;
};

export const DifficultyTag = ({ difficulty }) => {
    return <Tag className={difficulty.toLowerCase()}>{difficulty}</Tag>;
};

export const CategoryTag = ({ category }) => {
    const categoryClass = category.replace(/\s+/g, ''); // Remove spaces for class name
    return <Category className={categoryClass.toLowerCase()}>{category}</Category>;
};
