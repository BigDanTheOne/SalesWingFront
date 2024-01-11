import React from 'react';
import './Navbar.css'; // Assume you have corresponding CSS for styling

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    YourLogo
                </div>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <a href="/answered" className="navbar-links">Answered Questions</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/recommended" className="navbar-links">Recommended</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/favorites" className="navbar-links">Community Favorites</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/essentials" className="navbar-links">Essentials</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
