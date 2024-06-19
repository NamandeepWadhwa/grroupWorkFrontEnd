import Image from 'next/image';
import {Row, Col, Container, Button} from 'react-bootstrap';
import Link from 'next/link';
import {gettingQuestionByUser} from '@/lib/question/gettingQuestionByUser';
import { useEffect,useState } from 'react';
import  styles from "@/styles/userQuestion.module.css";
import UserQuestion from '@/components/userQuestions';
import Router from 'next/router';
export default function User(){
  const router = Router;
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    
    const fetchData = async () => {
      try{
      const data = await gettingQuestionByUser();
     
      setQuestions(data);
      }
      catch(error){
        console.log(error);
        alert('Error fetching questions:');
      }
    };
    
    fetchData();
  }, []);

return<>
<Container className={styles.scrollable +" bg-white"}>
  <Row className="my-2 ">
    <Col md={12}>
           <Link href="/ask"><Image src="/backArrowQuestions.png" width={50} height={50} alt="back arrow image "></Image></Link> 
        </Col>
      
    
  </Row>
  <Row className="mx-2 my-4">
        <Col>
        <Button variant="danger" onClick={()=>router.push('/user/questions/createQuestion')}>Post question</Button>
        </Col>
      </Row>
  {questions.length === 0 ? (
    <h3 className="m-3">No questions found</h3>
  ) : (<>{questions.map((question) => (
    <UserQuestion key={question._id} question={question} />
  ))} </>)}
</Container>
</>

}