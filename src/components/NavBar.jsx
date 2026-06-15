import { Tooltip } from "antd";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import { useUser } from "./provider/useUser";



const NavBar = () => {
  const { user } = useUser();
  const firstName = user ? user.split(" ")[0].toLowerCase() : "alice";

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="University of Cincinnati logo"
            src="/logos/University_of_Cincinnati_logo.png"
            width="150"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav style={{ display: "flex", alignItems: "center" }}>
          <Nav.Link as={Link} to="/">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/garden">
            Garden
          </Nav.Link>
          <Nav.Link as={Link} to="/todo">
            To Do
          </Nav.Link>
          <Nav.Link as={Link} to="/announcements">
            Announcements
          </Nav.Link>
          <Nav.Link as={Link} to="/account">
            <Tooltip title="Profile">
              <img
                alt="Profile"
                style={{ borderRadius: "50%", height: 50 }}
                src={`/profileImages/${firstName}.jpg`}
              />
            </Tooltip>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
