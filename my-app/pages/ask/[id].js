import { useRouter } from 'next/router'
import { getQuesionById } from '@/lib/question/questionById'
import { useEffect,useState } from 'react'
import { Row,Col,Container,Button} from "react-bootstrap";
import Image from 'next/image';
import Link from 'next/link';
import  styles from "@/styles/QuesetionDisplay.module.css";
import { updateUpVote } from '@/lib/question/updateUpVote';

 
export default function Page() {
  const [question, setQuestion] = useState("");
  const [upVote,setupVote] = useState(0);
  const[isUpvoted,setIsUpvoted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const id = router.query.id;
      
      const data = await getQuesionById(id);
       setupVote(data._doc.upVotesNumber);
       setIsUpvoted(data.upvotedByUser);
      


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

  return( 
    <Container className={`${styles.scrollable} bg-white`}>
      <Row className="my-2">
        <Col>
           <Link href="/questions"><Image src="/backArrowQuestions.png" width={50} height={50} alt="back arrow image "></Image></Link> 
        </Col>
      </Row>
        <Row className="my-3">
            <Col >
                <p><h3>Title: </h3>{question.title}</p>
                <p><h3>Description</h3>{question.description}</p>
                <Button variant="white" onClick={handleUpvote}><Image src={isUpvoted?"/questionUpvoted.png":"/questionUpvote.png"}  width={20} height={20} alt="like button"></Image> {upVote}</Button>
            </Col>
        </Row>
    </Container>
)
}