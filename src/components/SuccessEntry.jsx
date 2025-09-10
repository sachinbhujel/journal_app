import React from "react";

export default function SuccessEntry({ setSuccessShow }) {
  return (
    <div className="success-entry animate-in">
      <h3>Entry Saved Successfully!</h3>
      <span
        className="material-symbols-outlined success-icon"
        onClick={() => setSuccessShow(false)}
      >
        close
      </span>
    </div>
  );
}
