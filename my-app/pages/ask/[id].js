import { useRouter } from 'next/router'
import { getQuesionById } from '@/lib/question/questionById'
import { useEffect,useState } from 'react'
import { Row,Col,Container,Button} from "react-bootstrap";
import Image from 'next/image';
import Link from 'next/link';
import  styles from "@/styles/QuesetionDisplay.module.css";
import { updateUpVote } from '@/lib/question/updateUpVote';
import Form from 'react-bootstrap/Form';
import {postingAnswer} from '@/lib/answer/postingAsnwer';
import {getAnswers} from '@/lib/answer/getAnswers';
import Answer from '@/components/asnwer';
 
export default function Page() {
  const [answers,setAnswers] = useState([]);
  const [question, setQuestion] = useState("");
  const [upVote,setupVote] = useState(0);
  const[isUpvoted,setIsUpvoted] = useState(false);
  const [newAnswer, setNewAnswer] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const id = router.query.id;
      
      const data = await getQuesionById(id);
       setupVote(data._doc.upVotesNumber);
       setIsUpvoted(data.upvotedByUser);
      const dataAnswers = await getAnswers(id);
      
      setAnswers(dataAnswers);


      setQuestion(data._doc);
    };
  
    fetchData();
  }, []);
  const handleUpvote= async()=>{
      if(isUpvoted){
        try{
        const number=await updateUpVote(question._id,false);
        
        
        setupVote(number.upVotesNumber);
        setIsUpvoted(false);
        }
        catch(err){
          console.log(err);
        }
      }
      else{
        try{
        const number =await updateUpVote(question._id,true);
        
        setupVote(number.upVotesNumber);
        setIsUpvoted(true);
        }
        catch(err){
          console.log(err);
        }
      }


  }
  const handleAddAnswer = async (e) => {
    e.preventDefault();
    const id = router.query.id;
    await postingAnswer(id, newAnswer );
    const data = await getAnswers(id);
    setAnswers(data);
  };

  return( 
    <Container className={`${styles.scrollable} bg-white`}>
      <Row className="my-2">
        <Col>
           <Link href="/ask"><Image src="/backArrowQuestions.png" width={50} height={50} alt="back arrow image "></Image></Link> 
        </Col>
      </Row>
        <Row className="my-3">
            <Col >
                <p><h3>Title: </h3>{question.title}</p>
                <p><h3>Description</h3>{question.description}</p>
                <Button variant="white" onClick={handleUpvote}><Image src={isUpvoted?"/questionUpvoted.png":"/questionUpvote.png"}  width={20} height={20} alt="like button"></Image> {upVote}</Button>
            </Col>
            </Row>
           
           
            <Row>
            <Col>
            <Form onSubmit={handleAddAnswer}>
              <Form.Group className="mb-3">
                <Form.Label>Add a answer</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form></Col>
        </Row>
      
          <h4>Answers:</h4>
          {answers.length > 0 ? (
            answers.map((answer, index) => (
              <Answer key={index} answer={answer} />
            ))
          ) : (
            <p>No answers yet.</p>
          )}
     
    </Container>
)
}