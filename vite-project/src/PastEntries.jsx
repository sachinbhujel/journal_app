import React from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
import "github-markdown-css";

function PastEntries({
    entries,
    handleEntryDelete,
    handleEntryEdit,
    showButtons = true,
}) {
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
                            <h2>
                                {entry.title.length > 10
                                    ? entry.title.slice(0, 16) + "..."
                                    : entry.title}
                            </h2>
                            <div className="date-time-div">
                                <p>{entry.date}</p>
                                <p
                                    className="time"
                                    style={{
                                        fontSize: "14px",
                                        marginTop: "6px",
                                    }}
                                >
                                    {entry.time}
                                </p>
                            </div>
                        </div>
                        <div className="entry-found-content">
                            {entry.content.length > 70
                                ? entry.content.slice(0, 140) + "..."
                                : entry.content}
                        </div>

                        <div className="entry-found-select">
                            <p
                                className="mood"
                                style={{
                                    backgroundColor:
                                        moodColors[index % moodColors.length],
                                }}
                            >
                                {entry.mood}
                            </p>
                            <p
                                className="category"
                                style={{
                                    backgroundColor:
                                        categoryColors[
                                            index % categoryColors.length
                                        ],
                                }}
                            >
                                {entry.category}
                            </p>
                        </div>
                        {showButtons && (
                            <div className="edit-delete-div">
                                <span
                                    className="material-symbols-outlined entry-edit"
                                    onClick={() =>
                                        handleEntryEdit(index, entry)
                                    }
                                >
                                    edit
                                </span>
                                <span
                                    className="material-symbols-outlined entry-delete"
                                    onClick={() => handleEntryDelete(index)}
                                >
                                    delete
                                </span>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default PastEntries;
