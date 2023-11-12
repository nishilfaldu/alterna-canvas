import "./App.css";

import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import PlantComp from "./components/PlantComp";
import { UserProvider } from "./components/provider/Provider";
import Account from "./Pages/Account";
import Announcements from "./Pages/Announcements";
import Course from "./Pages/Course";
import Dashboard from "./Pages/Dashboard";
import ToDo from "./Pages/ToDo";



function App() {
  return (
    <>
      <UserProvider>
      <NavBar />
        <Container className="my-3">
          <Router>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/garden" element={<PlantComp isDashboard={false} />} />
              <Route path="/todo" element={<ToDo />} />
              <Route path="/course/:id" element={<Course />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </Container>
      </UserProvider>
    </>
  );
}

export default App;
