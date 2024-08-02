import { useRouter } from "next/router";
import { getTicketById } from "@/lib/ticket/getTicketbyId";
import { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/QuesetionDisplay.module.css";
import Form from "react-bootstrap/Form";
import { getAllResponses } from "@/lib/ticketResponse/getAllResponses";
import TicketResponse from "@/components/ticket";
import {createResponse} from "@/lib/ticketResponse/createResponse";
import {closeTicket} from "@/lib/ticket/closeTicket";


export default function Page() {
  const router = useRouter();
  const id = router.query.id;
  const [ticket, setTicket] = useState({});
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState("");

 
  useEffect(() => {
    const fetchData = async () => {

      const data = await getTicketById(id);
      const dataResponses = await getAllResponses(data._id);
      setResponses(dataResponses);
      

     

      setTicket(data);
    };

    fetchData();
  }, [id]);
  const handleCloseTicket=async()=>{
    await closeTicket(ticket._id);
    router.push("/ticket");
  }

const handleNewResponse=async(e)=>{
  e.preventDefault();
  if(newResponse==""){alert("Response cannot be left empty");}
  else{
    
  await createResponse(ticket._id,newResponse);
  setNewResponse("");
  const dataResponses = await getAllResponses(ticket._id);
  setResponses(dataResponses);
  }
};
if(ticket=={}){return <h1>Loading...</h1>}
if(ticket==null){return <h1>Not foundM</h1>}
  return (
    <Container className={`${styles.scrollable} bg-white`}>
      <Row className="my-2">
        <Col>
          <Link href="/ticket">
            <Image
              src="/backArrowQuestions.png"
              width={50}
              height={50}
              alt="back arrow image "
            ></Image>
          </Link>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <p>
            <h3>Title: </h3>
            {ticket.title}
          </p>
          <p>
            <h3>Description</h3>
            {ticket.description}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          {ticket.isActive == true ? (
            <Button variant="danger" onClick={handleCloseTicket}>
              Close ticket
            </Button>
          ) : (
            <Button variant="secondary">Ticket in now closed</Button>
          )}
        </Col>
      </Row>

      {ticket.isActive && (
        <Row>
          <Col>
            <Form onSubmit={handleNewResponse}>
              <Form.Group className="mb-3">
                <Form.Label>Add a Response</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  required
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      )}

      <h4>Responses:</h4>
      {responses.length > 0 ? (
        responses.map((response, index) => (
          <TicketResponse key={index} ticketResponse={response} />
        ))
      ) : (
        <p>No Response yet.</p>
      )}
    </Container>
  );
}
