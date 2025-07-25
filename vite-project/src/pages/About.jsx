import React from "react";
import "../App.css";

export default function About() {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>
                Welcome to our platform! We are passionate about building
                intuitive and accessible web solutions for users across all
                devices. Our team values creativity, performance, and
                problem-solving.
            </p>

            <section className="section">
                <h2>Our Mission</h2>
                <p>
                    Our goal is to help people by building websites that are
                    fast, easy to use, and built to grow—designed to solve real
                    problems in everyday life.
                </p>
            </section>

            <section className="section">
                <h2>Our Vision</h2>
                <p>
                    We want to be a place people trust for creative digital
                    ideas and useful tools. We’re always learning and growing
                    with new technology to make things better for everyone.
                </p>
            </section>

            <section className="section">
                <h2>Meet the Team</h2>
                <ul className="team-list">
                    <li>
                        <strong>Sachin Bhujel</strong> – Frontend Developer
                    </li>
                    <li>
                        <strong>Saajan Bhujel</strong> – ??
                    </li>
                </ul>
            </section>
        </div>
    );
}
