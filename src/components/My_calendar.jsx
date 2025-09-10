"use client";

import Calendar from "react-calendar";
import "../App.css";

export default function MyCalendar({onDateClick}) {
    const isToday = (date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    function callDay(clickDay) {
        const year = clickDay.getFullYear();
        const month = String(clickDay.getMonth() + 1).padStart(2, "0");
        const day = String(clickDay.getDate()).padStart(2, "0");
        const selectedDate = `${year}-${month}-${day}`;
        onDateClick(selectedDate)
    }

    return (
        <div className="custom-calendar-container">
            <Calendar
                className="custom-calendar"
                onClickDay={callDay}
                tileClassName={({ date, view }) => {
                    if (view === "month" && isToday(date)) {
                        return "custom-today";
                    }
                    return "";
                }}
            />
        </div>
    );
}
