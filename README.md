# Reflectify — Your Personal Journal

Reflectify is a simple, elegant, and peaceful journaling web app built with React. It allows users to capture daily thoughts, moods, and categories, view past entries, and track writing streaks and monthly activity.

---

## Features

- Add, edit, and delete journal entries with title, mood, category, and markdown-supported content
- Live markdown preview while writing entries
- View past entries with mood and category color-coded badges
- Track your writing streak and entries count for the current month
- Responsive design with smooth animations
- Sidebar toggle with outside-click detection
- Success notification with CSS animation on entry save

---

## Tech Stack

- React (functional components, hooks)
- React Router (for routing/outlet support)
- React Markdown (for markdown rendering)
- CSS3 with animations and transitions
- Framer Motion (optional for animations)
- Custom hooks and utility functions for streak calculation and date filtering

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/reflectify.git
   cd reflectify

2. Install dependencies:
   
   ```bash
   npm install

3. Start the development server:
   
   ```bash
   npm start

---

## Folder Structure

   ```bash
    /src
    /MainLayout
        Sidebar.jsx
        MainLayout.jsx
        SuccessEntry.jsx
        Footer.jsx
    /components
    /pages
        Entries.jsx
        About.jsx
        No_page.jsx
    App.jsx
    AddEntry.jsx
    PastEntries.jsx
    Feature.jsx
    index.js