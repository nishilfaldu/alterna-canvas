import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Account from "./Pages/Account";
import Dashboard from "./Pages/Dashboard";
import Announcements from "./Pages/Announcements";
import Garden from "./Pages/Garden";
import Graphics from "./Pages/Graphics";
import SeniorDesign from "./Pages/SeniorDesign";
import ToDo from "./Pages/ToDo";
import UICourse from "./Pages/UICourse";
import NoPage from "./Pages/NoPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/garden" element={<Garden />} />
          <Route path="/graphics" element={<Graphics />} />
          <Route path="/seniordesign" element={<SeniorDesign />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/uicourse" element={<UICourse />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
