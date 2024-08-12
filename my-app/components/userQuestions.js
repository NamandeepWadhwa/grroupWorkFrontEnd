import Button from 'react-bootstrap/Button';
import Router from 'next/router';
import Image from 'next/image';
import { Row } from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {deleteQuestion } from "@/lib/question/deleteQuestion";
import { formatDate } from '@/lib/DateFromat/askDateFormat';
import Avatar from './Avatar';
export default function UserQuestion({question}) {
  
  const router=Router;

  const handleDelete=async()=>{
    try{
      await deleteQuestion(question._id);
      router.push("/ask");
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <>
    <Row className="border m-3 rounded  bg-white">
      <Avatar id={question.user} />
      <Col className="m-2" md={12}>
      {question.title.substr(0,100)}
      </Col>
      <Col className="m-2" md={12}>
      {question.description.substr(0,250)}
      </Col>
      <Col className="m-2" md={12}>
      <Image src="/questionUpvote.png" width={20} height={20} alt="upvote image"></Image>
      {" "+question.upVotesNumber}
      </Col>
      <Col className="m-2" md={12}>
      {
        "Posted on "+formatDate(question.created_at)
      }</Col>
      <Col className="m-2" md={12}>
          <div>
            {question.tags.map((tag, index) => (
              <Button
                key={index}
                variant="secondary"
                className="me-2 mb-2"
                
              >
                {tag}
              </Button>
            ))}
          </div>
        </Col>
  
      <Col className="m-2 " md={12}>
      <Button variant="danger"  onClick={(e)=>{e.preventDefault();router.push(`../ask/${question._id}`)}} >View question</Button>
      <Button variant="danger" className="m-2"  onClick={(e)=>{e.preventDefault();router.push(`./questions/${question._id}`)}} >Edit question</Button>
      <Button variant="danger"className="m-2"   onClick={ handleDelete} >Delete question</Button>
      </Col>
    </Row>
    
 
 
    </>
  );


}


