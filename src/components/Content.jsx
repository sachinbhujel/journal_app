import React from "react";
import ReactMarkdown from "react-markdown";

function Content({ setContentBox, title, content }) {
    const handleBack = () => {
        setContentBox(false);
    };
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <div
                className="add-entry-container"
                style={{
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                <div className="add-entry-header" style={{ marginBottom: "0" }}>
                    <h2>{title}</h2>
                    <button className="close-btn" onClick={handleBack}>
                        ×
                    </button>
                </div>

                <div
                    className="content-div"
                    style={{ overflowY: "auto", height: "80%" }}
                >
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default Content;
