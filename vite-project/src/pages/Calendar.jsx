import React from "react";
import "../App.css";
import MyCalendar from "../pages/My_calendar.jsx";

export default function Calendar() {

    return (
        <div className="calendar-wrapper">
            <h1 className="calendar-title">Monthly Calendar</h1>
            <p className="calendar-description">
                Explore each month and keep track of important dates. Today is
                highlighted for your convenience.
            </p>
            <MyCalendar />
        </div>
    );
}