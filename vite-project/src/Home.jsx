import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Feature from "./Feature";
import PastEntries from "./PastEntries";
import AddEntry from "./AddEntry";

function Home() {
    const [menuOpen, setMenuOpen] = useState(true);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [addButtonOpen, setAddButtonOpen] = useState(false);
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
            if (window.innerWidth >= 600) {
                setMenuOpen(true);
            } else {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSidebar = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleAddEntry = () => {
        setAddButtonOpen(true);
    };

    const handleSave = (entryData) => {
        const newEntry = {
      ...entryData,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      })
    };
    setEntries([newEntry, ...entries]);
        setAddButtonOpen(false);
    }

    return (
        <div>
            {addButtonOpen ? (
                <AddEntry setAddButtonOpen={setAddButtonOpen} handleSave={handleSave}/>
            ) : (
                <div className="home">
                    {menuOpen && (
                        <div className={`sidebar ${isMobile ? "visible" : ""}`}>
                            {isMobile && (
                                <span
                                    className="material-symbols-outlined close-button"
                                    onClick={handleSidebar}
                                >
                                    close
                                </span>
                            )}
                            <ul>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/calendar">Calendar</Link>
                                </li>
                                <li>
                                    <Link to="/Entries">Entries</Link>
                                </li>
                            </ul>
                        </div>
                    )}

                    {isMobile && menuOpen && (
                        <div className="overlay" onClick={handleSidebar}></div>
                    )}

                    <div className="main">
                        <span
                            className="material-symbols-outlined close"
                            onClick={handleSidebar}
                        >
                            dock_to_right
                        </span>
                        <div className="main-div">
                            <h1>Reflectify – Your Personal Journal</h1>
                            <p>
                                A simple and peaceful space to capture your
                                thoughts, dreams, and daily moments. Reflect,
                                write, and grow—one entry at a time.
                            </p>
                        </div>
                        <div className="add-entry-button" onClick={handleAddEntry}>
                            <span className="material-symbols-outlined">
                                add
                            </span>
                            <button>Add Entry</button>
                        </div>
                        <div className="entries-detail-div">
                            <Feature title="Total Entries" number={entries.length} />
                            <Feature title="This Month" number="05" />
                            <Feature title="Streak" number="0" />
                        </div>
                        <div className="past-entries">
                            <h2>Past Entries</h2>
                            <PastEntries entries={entries}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
