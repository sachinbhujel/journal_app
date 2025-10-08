import React, { useState, useEffect } from "react";
import AddEntry from "./AddEntry";
import Feature from "./Feature";
import PastEntries from "./PastEntries";
import SuccessEntry from "./SuccessEntry";

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

export default function Home() {
    const [addButtonOpen, setAddButtonOpen] = useState(false);
    const [entries, setEntries] = useState(() => {
        try {
            const saved = localStorage.getItem("journalEntries");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [editingIndex, setEditingIndex] = useState(null);
    const [editEntry, setEditEntry] = useState(null);
    const [successShow, setSuccessShow] = useState(false);

    useEffect(() => {
        localStorage.setItem("journalEntries", JSON.stringify(entries));
    }, [entries]);

    const handleAddEntry = () => setAddButtonOpen(true);

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
        setSuccessShow(true);
    };

    const handleEntryDelete = (indexToDelete) => {
        setEntries((prev) =>
            prev.filter((_, index) => index !== indexToDelete)
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

    useEffect(() => {
        if (successShow) {
            const timeout = setTimeout(() => {
                setSuccessShow(false);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [successShow]);

    const LOAD_COUNT = 3;
    const [visibleCount, setVisibleCount] = useState(LOAD_COUNT);
    const visibleEntries = entries.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + LOAD_COUNT, entries.length));
    };

    return (
        <>
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
                    <div className="main-div">
                        <h1>Reflectify – Your Personal Journal</h1>
                        <p>
                            A simple and peaceful space to capture your
                            thoughts, dreams, and daily moments. Reflect, write,
                            and grow—one entry at a time.
                        </p>
                    </div>
                    <div className="add-entry-button" onClick={handleAddEntry}>
                        <span className="material-symbols-outlined">add</span>
                        <button>Add Entry</button>
                    </div>
                    <div className="stats-div">
                        <h2>Stats</h2>
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
                    </div>
                    <div className="past-entries">
                        <h2>Past Entries</h2>

                        <PastEntries
                            entries={visibleEntries}
                            handleEntryDelete={handleEntryDelete}
                            handleEntryEdit={handleEntryEdit}
                        />
                    </div>
                    {successShow && (
                        <SuccessEntry setSuccessShow={setSuccessShow} />
                    )}
                    {visibleCount < entries.length && (
                        <button onClick={handleLoadMore} className="load_more">
                            Load More
                        </button>
                    )}
                </>
            )}
        </>
    );
}
