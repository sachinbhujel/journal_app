import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Feature from "./Feature";
import PastEntries from "./PastEntries";
import AddEntry from "./AddEntry";

function calculateStreak(entries) {
  if (entries.length === 0) return 0;

  // Convert entry dates to Date objects
  const dates = entries.map(e => new Date(e.date));
  // Sort descending (latest first)
  dates.sort((a, b) => b - a);

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0,0,0,0); // normalize to start of day

  for (let i = 0; i < dates.length; i++) {
    let entryDate = new Date(dates[i]);
    entryDate.setHours(0,0,0,0); // normalize

    const diffDays = (currentDate - entryDate) / (1000 * 60 * 60 * 24);

    if (diffDays === 0 || diffDays === streak) {
      // If entry matches currentDate or currentDate minus streak days
      streak++;
      // Move to previous day for next check
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (diffDays > streak) {
      // Gap found, stop counting
      break;
    }
  }
  return streak;
}

function countEntriesThisMonth(entries) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return entries.filter(entry => {
    const entryDate = new Date(entry.date);
    if (isNaN(entryDate)) return false; // invalid date
    return (
      entryDate.getMonth() === currentMonth &&
      entryDate.getFullYear() === currentYear
    );
  }).length;
}


function Home() {
    const [menuOpen, setMenuOpen] = useState(true);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [addButtonOpen, setAddButtonOpen] = useState(false);
    const [entries, setEntries] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editEntry, setEditEntry] = useState(null);

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
        if(editingIndex !== null){
            const updatedEntries = [...entries];
            updatedEntries.splice(editingIndex, 1);
            setEntries([entryData, ...updatedEntries]);
            setEditingIndex(null);
        } else{
            setEntries([entryData, ...entries])
        }
        setAddButtonOpen(false);
    }

     const handleEntryDelete = (indexToDelete) => {
    setEntries((prevEntries) =>
      prevEntries.filter((_, index) => index !== indexToDelete)
    );
  };

   const handleEntryEdit = (index, entry) => {
    setEditingIndex(index);
    setEditEntry(entry);
    setAddButtonOpen(true);
  };

  const handleCloseForm = () => {
  setAddButtonOpen(false);
  setEditingIndex(null);
  setEditEntry(null);
};

const streak = calculateStreak(entries);
const entriesThisMonth = countEntriesThisMonth(entries);


    return (
        <div>
            {addButtonOpen ? (
                <AddEntry setAddButtonOpen={setAddButtonOpen} handleSave={handleSave}  entry={editEntry} handleCloseForm={handleCloseForm} />
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
                            <Feature title="This Month" number={entriesThisMonth} />
                            <Feature title="Streak" number={streak} />
                        </div>
                        <div className="past-entries">
                            <h2>Past Entries</h2>
                            <PastEntries entries={entries} handleEntryDelete={handleEntryDelete} handleEntryEdit={handleEntryEdit}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
