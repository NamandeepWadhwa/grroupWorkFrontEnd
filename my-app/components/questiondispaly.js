import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Router from 'next/router';
import Image from 'next/image';
import { Row } from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { Container } from 'react-bootstrap';
export default function DisplayQuestion({question}) {
  const router=Router;
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    return `${year}-${month}-${day}`;
  }
  return (
    <>
    <Row className="border my-3 rounded  bg-white">
      <Col className="m-2">
      {question.title.substr(0,50)}
      </Col>
      <Col className="m-2">
      <Image src="/questionUpvote.png" width={20} height={20} alt="upvote image"></Image>
      {" "+question.upVotesNumber}
      </Col>
      <Col className="m-2">
      {formatDate(question.created_at)}
      </Col>
      <Col className="m-2">
      <Button variant="danger" onClick={(e)=>{e.preventDefault();router.push(`./ask/${question._id}`)}} >View question</Button>
      </Col>
    </Row>
    
 
 
    </>
  );


}


