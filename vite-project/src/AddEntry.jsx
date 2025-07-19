import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";
import "./App.css";

function AddEntry({ setAddButtonOpen, handleSave, entry, handleCloseForm  }) {
    const [title, setTitle] = useState(entry?.title || "");
    const [mood, setMood] = useState(entry?.mood || "");
    const [category, setCategory] = useState(entry?.category || "");
    const [content, setContent] = useState(entry?.content || "");

    const [active, setActive] = useState("edit");
    const [previewOpen, setPreviewOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !mood || !category || !content) return;
        handleSave({
            title,
            mood,
            category,
            content,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        });

        setTitle("");
        setMood("");
        setCategory("");
        setContent("");
        setAddButtonOpen(false);
    };

    const handleBack = () => {
        handleCloseForm()
        setAddButtonOpen(false);
    };

    const handlePreview = () => {
        setActive("preview");
        setPreviewOpen(true);
    };

    const handleEdit = () => {
        setPreviewOpen(false);
        setActive("edit");
    };

    useEffect(() => {
        setTitle(entry?.title || "");
        setMood(entry?.mood || "");
        setCategory(entry?.category || "");
        setContent(entry?.content || "");
    }, [entry]);

    return (
        <div className="add-entry-container">
            <div className="add-entry-header">
                <h2>New Entry</h2>
                <button className="close-btn" onClick={handleBack}>
                    ×
                </button>
            </div>

            <form onSubmit={handleSubmit} className="add-entry-form">
                <input
                    className="entry-input"
                    type="text"
                    placeholder="Entry title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="entry-select-row">
                    <select
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        className="entry-select"
                    >
                        <option value="">Select mood...</option>
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="excited">Excited</option>
                        <option value="angry">Angry</option>
                    </select>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="entry-select"
                    >
                        <option value="">Select category...</option>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="travel">Travel</option>
                        <option value="ideas">Ideas</option>
                    </select>
                </div>

                <h3 style={{ fontSize: "16px", marginTop: "13px" }}>Content</h3>
                <div className="edit-preview-div">
                    <div
                        className={`edit-div ${
                            active === "edit" ? "active" : ""
                        }`}
                        onClick={handleEdit}
                    >
                        <span class="material-symbols-outlined">edit</span>
                        <p>Edit</p>
                    </div>
                    <div
                        className={`preview-div ${
                            active === "preview" ? "active" : ""
                        }`}
                        onClick={handlePreview}
                    >
                        <span class="material-symbols-outlined">
                            <span class="material-symbols-outlined">
                                visibility
                            </span>
                        </span>
                        <p>Preview</p>
                    </div>
                </div>
                {previewOpen ? (
                    <div className="markdown-content">
                        {content.length === 0 ? (
                            <p>
                                Nothing to preview. Start writing to see your
                                markdown rendered.
                            </p>
                        ) : (
                            <ReactMarkdown>{content}</ReactMarkdown>
                        )}
                    </div>
                ) : (
                    <textarea
                        className="entry-textarea"
                        placeholder="Write your thoughts using markdown"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                )}

                <div className="entry-buttons">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleBack}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="save-btn">
                        Save Entry
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddEntry;
