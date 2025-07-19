import React from "react";
import ReactMarkdown from 'react-markdown';
import "./App.css";
import 'github-markdown-css';

function PastEntries({ entries }) {
    return (
        <div className="entries">
            {entries.length === 0 ? (
                <div className="entry-not-found">
                    <h2>No entries found</h2>
                    <p>Start writing your first entry!</p>
                </div>
            ) : (
                entries.map((entry, index) => (
                    <div className="entry-found" key={index}>
                        <div className="entry-found-top">
                            <h2>{entry.title}</h2>
                            <p>{entry.date}</p>
                        </div>
                       <div className="entry-found-content">
  <ReactMarkdown>{entry.content}</ReactMarkdown>
</div>

                        <div className="entry-found-select">
                            <p className="mood">{entry.mood}</p>
                            <p className="category">{entry.category}</p>
                        </div>
                        <div className="edit-delete-div">
                            <span class="material-symbols-outlined entry-edit">
edit
</span>
<span class="material-symbols-outlined entry-delete">
delete
</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default PastEntries;
