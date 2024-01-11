import React from 'react';

// Main App component
function App() {
  return (
      <div>
        <Navbar />
        <SearchArea />
        <QuestionLists />
      </div>
  );
}

// Navbar component
function Navbar() {
  // JSX for Navbar goes here
  return <nav> {/* Navbar content */} </nav>;
}

// Search area component
function SearchArea() {
  // JSX for SearchArea goes here
  return <div> {/* Search area content */} </div>;
}

// QuestionLists component which contains all the question sections
function QuestionLists() {
  return (
      <div>
        <QuestionSection title="Answered Questions" />
        <QuestionSection title="Recommended" premium />
        <QuestionSection title="Community Favorites" />
        <QuestionSection title="Essentials" />
      </div>
  );
}

// Individual QuestionSection component
function QuestionSection({ title, premium }) {
  return (
      <section>
        <h2>{title}</h2>
        {premium && <PremiumBadge />}
        {/* List of questions */}
      </section>
  );
}

// Premium badge component
function PremiumBadge() {
  return <span>Premium</span>;
}

export default App;
