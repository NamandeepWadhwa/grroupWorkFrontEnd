import {Row,Col} from 'react-bootstrap';
import { formatDate } from '@/lib/DateFromat/askDateFormat';
import Router from 'next/router';
import { delteAnswer } from '@/lib/answer/deleteanser';

export default function Answer({answer,user=false}) {
  const router=Router;
  const handlviewQuestiont = () => {
    router.push(`/ask/${answer.question}`);
  };
  const handleDelete = async () => {
    try{
      await delteAnswer(answer._id);
      router.push("/ask");
    }
    catch(err){
      console.log(err);
    }
  };
 
    return (
       <Row className="border my-3 mx-1 rounded">
        <Col md={12} className="m-2">
        {answer.description}
        </Col>
        <Col md={12} className="m-2">
        {formatDate(answer.created_at)}
        </Col>
        {user && <Col md={12} className="m-2">
          <button className="btn btn-danger" onClick={handlviewQuestiont}>View</button>
          <button className="btn btn-danger m-2" onClick={handleDelete}>Delete</button>
        </Col>
        }
       </Row>
    )
}