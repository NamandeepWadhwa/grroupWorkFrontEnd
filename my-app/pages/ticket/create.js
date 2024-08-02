import { Container,Row,Col,Form ,Button} from "react-bootstrap";
import { useState } from "react";
import { createTicket } from "@/lib/ticket/createTicket";
import {router} from 'next/router';
export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  async function handleSubmit(e){
    e.preventDefault();
    if(title=="" || description==""){
      alert("Title and description are required.");
    
    }
    const sendData = {
      title,
      description
    };
    try{
      await createTicket(sendData);
      router.push("/ticket");

    }
    catch(err){
      console.log(err);
    };
    
  }


  return (
    <>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e)=>{
              setTitle(e.target.value); 
            }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" type="text" placeholder="Description of the problem" value={description} onChange={(e)=>{
              setDescription(e.target.value);
            }} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}