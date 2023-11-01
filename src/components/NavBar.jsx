import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";



const NavBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="University of Cincinnati logo"
            src="/University_of_Cincinnati_logo.png"
            width="150"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/">Dashboard</Nav.Link>
          <Nav.Link href="/garden">Garden</Nav.Link>
          <Nav.Link href="/todo">To Do</Nav.Link>
          <Nav.Link href="/announcements">Announcements</Nav.Link>
          <Nav.Link href="/account">Account</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
