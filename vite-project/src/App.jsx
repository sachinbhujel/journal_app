import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./MainLayout/MainLayout";
import About from "./pages/About";
import Calendar from "./pages/Calendar";
import Entries from  "./pages/Entries"
import No_page from "./pages/No_page";

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