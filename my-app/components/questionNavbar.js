import { Button } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import {Container,Row,Col} from 'react-bootstrap';
import { questionAtom } from "@/questinJoti/question";
import { useAtom } from "jotai";
import { gettingQuestions } from "@/lib/question/gettingQuestionNewest";
const {useEffect,useState} = require("react");

export default function QuestionNavbar() {
  const [tag, setTag] = useState(''); // tags:
  const [questions, setQuestions] = useAtom(questionAtom);
  async function getQuestions(){
    if(tag.length>0){
      const data = await gettingQuestions('newest',tag);
      setQuestions(data);
    }
    else{
    const data = await gettingQuestions('newest');
    setQuestions(data);
    }
    
  }
  async function OldestiQuestions(){
    if(tag.length>0){
      const data = await gettingQuestions('oldest',tag);
      setQuestions(data);
    }
    else{
    const data = await gettingQuestions('oldest');
    setQuestions(data);
    }
   
  }
  async function UpVoteQuestions(){
    if(tag.length>0){
      const data = await gettingQuestions('upVote',tag);
      setQuestions(data);
    }
    else{
    const data = await gettingQuestions('upVote');
    setQuestions(data);
    }
   
  }
  const submitTag = async (e) => {
    e.preventDefault();
    await getQuestions();

  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="m-2" href="/user/questions">
                My question
              </Nav.Link>
              <Nav.Link className="m-2" href="/user/answers">
                My answers
              </Nav.Link>
              <NavDropdown
                title="Filter"
                className="mt-2"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={getQuestions}>
                  Newest
                </NavDropdown.Item>
                <NavDropdown.Item onClick={OldestiQuestions}>
                  Oldest
                </NavDropdown.Item>
                <NavDropdown.Item onClick={UpVoteQuestions}>
                  UpVote
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="m-2" href="/ticket">
                Tickets
              </Nav.Link>
            </Nav>
            <Form inline>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search by Tag"
                    className=" mr-sm-2 m-2"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
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
    </>
  );
}