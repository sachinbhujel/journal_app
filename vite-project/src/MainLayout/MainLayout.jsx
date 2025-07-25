import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../App.css";
import Home from "../pages/Home";

function MainLayout() {
    const [dockOpen, setDockOpen] = useState(false);
    const [desktopDockOpen, setDesktopDockOpen] = useState(true);
    const dockRef = useRef(null);
    const location = useLocation();

    const handleClickDock = () => {
        setDockOpen(!dockOpen);
        setDesktopDockOpen(!desktopDockOpen)
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dockRef.current && !dockRef.current.contains(event.target)) {
                setDockOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="app">
            {/* Sidebar for computers */}
            <div className="dock-for-computers">
                {desktopDockOpen && <Sidebar />}
            </div>
            <div className="main">
                {/* Sidebar for mobiles */}
                <div className="dock-for-mobiles">
                    {dockOpen && (
                        <div ref={dockRef}>
                            <Sidebar />
                        </div>
                    )}
                </div>

                {/* Dock toggle button */}
                <span
                    className="material-symbols-outlined close"
                    onClick={handleClickDock}
                >
                    dock_to_right
                </span>
                {location.pathname === "/" ? <Home /> : <Outlet />}
            </div>
        </div>
    );
}

export default MainLayout;
