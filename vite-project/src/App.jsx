import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Calendar from "./Calendar";
import Entries from "./Entries";
import NoPage from "./NoPage";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="entries" element={<Entries />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;