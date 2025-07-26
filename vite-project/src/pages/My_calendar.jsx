'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import '../App.css'; // custom styles

export default function MyCalendar() {
  const [value, onChange] = useState(new Date());

  // Check if given date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="custom-calendar-container">
      <Calendar
        onChange={onChange}
        value={value}
        className="custom-calendar"
        tileClassName={({ date, view }) => {
          if (view === 'month' && isToday(date)) {
            return 'custom-today';
          }
          return '';
        }}
      />
    </div>
  );
}