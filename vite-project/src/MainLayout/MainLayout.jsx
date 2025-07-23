import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { Outlet } from "react-router-dom";
import Feature from "../Feature";
import PastEntries from "../PastEntries";
import AddEntry from "../AddEntry";
import Sidebar from "./Sidebar";
import SuccessEntry from "./SuccessEntry";
import Entries from "../pages/Entries";
import Footer from "./Footer";

function calculateStreak(entries) {
    if (entries.length === 0) return 0;

    const dates = entries.map((e) => new Date(e.date));
    dates.sort((a, b) => b - a);

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < dates.length; i++) {
        let entryDate = new Date(dates[i]);
        entryDate.setHours(0, 0, 0, 0);

        const diffDays = (currentDate - entryDate) / (1000 * 60 * 60 * 24);

        if (diffDays === 0 || diffDays === streak) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (diffDays > streak) {
            break;
        }
    }
    return streak;
}

function countEntriesThisMonth(entries) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        if (isNaN(entryDate)) return false;
        return (
            entryDate.getMonth() === currentMonth &&
            entryDate.getFullYear() === currentYear
        );
    }).length;
}

function MainLayout() {
    const [addButtonOpen, setAddButtonOpen] = useState(false);
    const [entries, setEntries] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editEntry, setEditEntry] = useState(null);
    const [dockOpen, setDockOpen] = useState(false);
    const [successShow, setSuccessShow] = useState(false);
    const dockRef = useRef(null);

    const handleAddEntry = () => {
        setAddButtonOpen(true);
    };

    const handleSave = (entryData) => {
        if (editingIndex !== null) {
            const updatedEntries = [...entries];
            updatedEntries.splice(editingIndex, 1);
            setEntries([entryData, ...updatedEntries]);
            setEditingIndex(null);
        } else {
            setEntries([entryData, ...entries]);
        }
        setAddButtonOpen(false);
    };

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

    const handleClickDock = () => {
        setDockOpen(!dockOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dockRef.current && !dockRef.current.contains(event.target)) {
                setDockOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    

    useEffect(() => {
        if (successShow) {
            const timeout = setTimeout(() => {
                setSuccessShow(false);
            }, 2000);

            return () => clearTimeout(timeout); // cleanup
        }
    }, [successShow]);

    return (
        <div className="app">
            <div className="dock-for-computers">
                {dockOpen ? <Sidebar /> : ""}
            </div>
            {addButtonOpen ? (
                <AddEntry
                    setAddButtonOpen={setAddButtonOpen}
                    handleSave={handleSave}
                    entry={editEntry}
                    handleCloseForm={handleCloseForm}
                    setSuccessShow={setSuccessShow}
                />
            ) : (
                <>
                    <div className="main">
                        <div className="dock-for-mobiles">
                            {dockOpen ? (
                                <div ref={dockRef}>
                                    <Sidebar />
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <span
                            className="material-symbols-outlined close"
                            onClick={handleClickDock}
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
                        <div
                            className="add-entry-button"
                            onClick={handleAddEntry}
                        >
                            <span className="material-symbols-outlined">
                                add
                            </span>
                            <button>Add Entry</button>
                        </div>
                        <div className="entries-detail-div">
                            <Feature
                                title="Total Entries"
                                number={entries.length}
                            />
                            <Feature
                                title="This Month"
                                number={entriesThisMonth}
                            />
                            <Feature title="Streak" number={streak} />
                        </div>
                        <div className="past-entries">
                            <h2>Past Entries</h2>
                            <PastEntries
                                entries={entries}
                                handleEntryDelete={handleEntryDelete}
                                handleEntryEdit={handleEntryEdit}
                            />
                        </div>
                        {successShow ? (
                            <SuccessEntry setSuccessShow={setSuccessShow} />
                        ) : (
                            ""
                        )}
                    </div>
                </>
            )}
            <Outlet />
        </div>
    );
}

export default MainLayout;
