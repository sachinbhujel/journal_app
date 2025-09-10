import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <NavLink to="/">
                    <li>Home</li>
                </NavLink>
                <NavLink to="/calendar">
                    <li>Calendar</li>
                </NavLink>

                <NavLink to="/Entries">
                    <li>Entries</li>
                </NavLink>
                <NavLink to="/about">
                    <li>About</li>
                </NavLink>
            </ul>
        </div>
    );
}

export default Sidebar;
