import React from "react";
import { Link} from "react-router-dom";

function Sidebar() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/calendar">Calendar</Link>
                </li>
                <li>
                    <Link to="/Entries">Entries</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
