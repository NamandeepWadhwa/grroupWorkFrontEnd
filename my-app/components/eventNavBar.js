import { gettingUser } from "@/lib/gettingUser";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row,Col,Button } from "react-bootstrap";
import { set } from "date-fns";

export default function EventNavbar({reload}) {
  const [newest, setNewest] = useState(true);
  const role = gettingUser().role;
  const [category, setCategory] = useState("");
  let ssfStaff=role==="SSF Staff";
  const sortNewest = async (e) => {
    setNewest(true);
    await reload(true);

  };
  const sortOldest = async (e) => {
    setNewest(false);
    await reload(false);
  };
  const submitTag = async (e) => {
    e.preventDefault();
    await reload(newest,category);
    setCategory("");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {ssfStaff && <Nav.Link href="/user/events">My Events</Nav.Link>}
            {ssfStaff && <Nav.Link href="/user/events/create">Create</Nav.Link>}
            <Nav.Link href="#" onClick={sortNewest}>Newest</Nav.Link>
            <Nav.Link href="#" onClick={sortOldest}>Oldest</Nav.Link>
          </Nav>
          <Form>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search by Tag"
                  className=" mr-sm-2 m-2"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Col>
              <Col xs="auto">
                <Button type="submit" className="m-2 " onClick={submitTag}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}