import Image from 'next/image';
import {Row, Col, Container} from 'react-bootstrap';
import Link from 'next/link';
import {getAnswers} from '@/lib/answer/getAnserbyUser';
import { useEffect,useState } from 'react';
import  styles from "@/styles/userQuestion.module.css";
import Router from 'next/router';
import Answer from '@/components/asnwer';
export default function User(){
  const router = Router;
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    
    const fetchData = async () => {
      try{
      const data = await getAnswers();
     
      setAnswers(data);
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
 
  {answers.length === 0 ? (
    <h3 className="m-3">No questions found</h3>
  ) : (<>{answers.map((asnwers) => (
    <Answer key={answers._id} answer={asnwers} user={true} />
  ))} </>)}
</Container>
</>

}