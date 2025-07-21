import React from 'react'

function NoPage() {
  return (
    <div>
      <div className="main">
                        <span
                            className="material-symbols-outlined close"
                            onClick={handleSidebar}
                        >
                            dock_to_right
                        </span>
                        <div className="main-div">
                            <h1>Reflectify – Your Personal Journal</h1>
                            <p>
                                A simple and peaceful space to capture your
                                thoughts, dreams, and daily moments. Reflect,
                                write, and grow—one entry at a time.
                            </p>
                        </div>
                        <div
                            className="add-entry-button"
                            onClick={handleAddEntry}
                        >
                            <span className="material-symbols-outlined">
                                add
                            </span>
                            <button>Add Entry</button>
                        </div>
                        <div className="entries-detail-div">
                            <Feature
                                title="Total Entries"
                                number={entries.length}
                            />
                            <Feature
                                title="This Month"
                                number={entriesThisMonth}
                            />
                            <Feature title="Streak" number={streak} />
                        </div>
                        <div className="past-entries">
                            <h2>Past Entries</h2>
                            <PastEntries
                                entries={entries}
                                handleEntryDelete={handleEntryDelete}
                                handleEntryEdit={handleEntryEdit}
                            />
                        </div>
                    </div>
    </div>
  )
}

export default NoPage