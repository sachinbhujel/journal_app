import React, { useState, useEffect } from "react";
import "../App.css";
import MyCalendar from "./My_calendar.jsx";

export default function Calendar() {
    const [dateEntryShow, setDateEntryShow] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredEntries, setFilteredEntries] = useState([]);

    const moodColors = [
        "orange",
        "#fca311",
        "#cae9ff",
        "#BBDEFB",
        "#ffcdb2",
        "#f9f7f3",
    ];
    const categoryColors = [
        "lightskyblue",
        "#FFF9C4",
        "#D1C4E9",
        "#B2EBF2",
        "#FFECB3",
        "#DCEDC8",
    ];

    useEffect(() => {
        const saved = localStorage.getItem("journalEntries");
        if (saved) {
            setDateEntryShow(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (dateEntryShow.length > 0) {
            const match = dateEntryShow.filter(
                (entry) => entry.date === selectedDate
            );
            setFilteredEntries(match);
        } else {
            setFilteredEntries([]);
        }
    }, [selectedDate, dateEntryShow]);

    return (
        <div className="calendar-wrapper">
            <h1 className="calendar-title">Monthly Calendar</h1>
            <p className="calendar-description">
                Explore each month and keep track of important dates. Today is
                highlighted for your convenience.
            </p>
            <div className="selected-date-entry-div">
                <div className="calendar-selected-date-entry-div">
                    <MyCalendar onDateClick={setSelectedDate} />
                </div>
                <div className="entries-selected-date-entry-div">
                    {filteredEntries.length > 0 ? (
                        <div className="entry-list">
                            <h2>Entries on {selectedDate}</h2>
                            <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                                {filteredEntries.map((entry, index) => (
                                    <div
                                        key={index}
                                        className="entries-container"
                                    >
                                        <div className="entry-found">
                                            <div className="entry-found-top">
                                                <h2>
                                                    {entry.title.length > 10
                                                        ? entry.title.slice(
                                                              0,
                                                              16
                                                          ) + "..."
                                                        : entry.title}
                                                </h2>
                                                <div className="date-time-div">
                                                    <p className="time">
                                                        {entry.time
                                                            .split(":")
                                                            .slice(0, 2)
                                                            .join(":") +
                                                            " " +
                                                            entry.time
                                                                .split(":")[2]
                                                                .split(" ")[1]}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="entry-found-content">
                                                {entry.content.length > 70
                                                    ? entry.content.slice(
                                                          0,
                                                          150
                                                      ) + "..."
                                                    : entry.content}
                                            </div>

                                            <div className="entry-actions">
                                                <div className="entry-found-select">
                                                    <p
                                                        className="mood"
                                                        style={{
                                                            backgroundColor:
                                                                moodColors[
                                                                    index %
                                                                        moodColors.length
                                                                ],
                                                        }}
                                                    >
                                                        {entry.mood}
                                                    </p>
                                                    <p
                                                        className="category"
                                                        style={{
                                                            backgroundColor:
                                                                categoryColors[
                                                                    index %
                                                                        categoryColors.length
                                                                ],
                                                        }}
                                                    >
                                                        {entry.category}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="calendar-entry-not-found">
                            <h2>No entries found</h2>
                            <p>Start writing your first entry!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
