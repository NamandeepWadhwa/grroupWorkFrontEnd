import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function TicketNavBar({reload}) {
  const handleActiveTickets = async () => {
    await reload("true");
  };
  const handleNotActiveTickets = async() => {
    await reload("false");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/ticket">Home</Nav.Link>
            <Nav.Link href="#" onClick={handleActiveTickets}>
              Active
            </Nav.Link>
            <Nav.Link href="#" onClick={handleNotActiveTickets}>
              Closed
            </Nav.Link>
            <Nav>
              <Nav.Link href="/ticket/create">Create Tickets</Nav.Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

