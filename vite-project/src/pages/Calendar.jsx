import React, { useState, useEffect } from "react";
import "../App.css";

export default function Calendar() {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [historyData, setHistoryData] = useState([]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();


    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const handlePrev = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNext = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const isToday = (day) =>
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

    const monthName = currentDate.toLocaleString("default", { month: "long" });

    // Fetch “Today in History” data
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(
                    `https://byabbe.se/on-this-day/${today.getMonth() + 1}/${today.getDate()}/events.json`
                );
                const data = await response.json();
                setHistoryData(data.events.slice(0, 5)); // Show top 5 events
            } catch (error) {
                console.error("Failed to fetch history data", error);
            }
        };

        fetchHistory();
    }, []);

    // Build calendar days
    const calendarDays = [];
    for (let i = 0; i < firstDayIndex; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="day empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(
            <div key={day} className={`day ${isToday(day) ? "today" : ""}`}>
                {day}
            </div>
        );
    }

    return (
        <div className="calendar-wrapper">
            <h1 className="calendar-title">Monthly Calendar</h1>
            <p className="calendar-description">
                Explore each month and keep track of important dates. Today is
                highlighted for your convenience.
            </p>

            <div className="calendar">
                <div className="calendar-header">
                    <span
                        className="material-symbols-outlined arrow-icons"
                        onClick={handlePrev}
                    >
                        arrow_back_ios
                    </span>
                    <h2>
                        {monthName} {year}
                    </h2>
                    <span
                        className="material-symbols-outlined arrow-icons"
                        onClick={handleNext}
                    >
                        arrow_forward_ios
                    </span>
                </div>

                <div className="day-names">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (d) => (
                            <div key={d} className="day-name">
                                {d}
                            </div>
                        )
                    )}
                </div>

                <div className="calendar-grid">{calendarDays}</div>
            </div>

            <div className="history-today">
                <h3>What Happened on This Day?</h3>
                {historyData.length > 0 ? (
                    <ul>
                        {historyData.map((event, idx) => (
                            <li key={idx}>
                                <strong>{event.year}:</strong> {event.description}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading historical events...</p>
                )}
            </div>
        </div>
    );
}