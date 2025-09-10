import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import About from "./components/About";
import Calendar from "./components/Calendar";
import Entries from "./components/Entries";
import No_page from "./components/No_page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="about" element={<About />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="entries" element={<Entries />} />
                    <Route path="*" element={<No_page />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;