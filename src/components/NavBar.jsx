import { Tooltip } from "antd";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useUser } from "./provider/useUser";



const NavBar = () => {
  const { user } = useUser();

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="University of Cincinnati logo"
            src="/logos/University_of_Cincinnati_logo.png"
            width="150"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav style={{ display: "flex", alignItems: "center" }}>
          <Nav.Link href="/">Dashboard</Nav.Link>
          <Nav.Link href="/garden">Garden</Nav.Link>
          <Nav.Link href="/todo">To Do</Nav.Link>
          <Nav.Link href="/announcements">Announcements</Nav.Link>
          <Nav.Link href="/account">
            <Tooltip title="Profile">
              <img
                style={{ borderRadius: "50%", height: 50 }}
                src={`/profileImages/${user
                  .split(" ")[0]
                  .toLowerCase()}.jpg`}
              />
            </Tooltip>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
