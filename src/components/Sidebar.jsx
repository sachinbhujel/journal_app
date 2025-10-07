import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <NavLink to="/">
                    <div className="sidebar-icons-div">
                        <span class="material-symbols-outlined">home</span>
                        <li>Home</li>
                    </div>
                </NavLink>
                <NavLink to="/calendar">
                    <div className="sidebar-icons-div">
                        <span class="material-symbols-outlined">
                            calendar_add_on
                        </span>
                        <li>Calendar</li>
                    </div>
                </NavLink>

                <NavLink to="/Entries">
                    <div className="sidebar-icons-div">
                        <span class="material-symbols-outlined">
                            event_list
                        </span>
                        <li>Entries</li>
                    </div>
                </NavLink>
                <NavLink to="/about">
                    <div className="sidebar-icons-div">
                        <span class="material-symbols-outlined">info</span>
                        <li>About</li>
                    </div>
                </NavLink>
            </ul>
        </div>
    );
}

export default Sidebar;
