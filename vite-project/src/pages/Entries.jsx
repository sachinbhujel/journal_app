import React, { useEffect, useState } from "react";
import PastEntries from "../PastEntries";

function Entries() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("journalEntries");
        if (saved) {
            setEntries(JSON.parse(saved));
        }
    }, []);

    return (
        <div className="entries-data">
            <div className="entries-data-title">
                <h1>All Saved Entries</h1>
                <p>
                    Here's a collection of all your journal entries saved so
                    far. You can review your past thoughts, edit memories, or
                    remove anything that no longer serves you.
                </p>
            </div>

            <PastEntries entries={entries} showButtons={false} />
        </div>
    );
}

export default Entries;
