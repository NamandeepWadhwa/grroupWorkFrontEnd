import { Row, Col} from "react-bootstrap";
import { useEffect, useState } from "react";
import DisplayQuestion from "@/components/questiondispaly";
import  styles from "@/styles/Question.module.css";
import QuestionNavbar from "@/components/questionNavbar";
import { questionAtom } from "@/questinJoti/question";
import { useAtom } from "jotai";
import { gettingQuestions } from "@/lib/question/gettingQuestionNewest";

export default function Question() {
  const [questions, setQuestions] = useAtom(questionAtom);

  useEffect(() => {
    try{
    const fetchData = async () => {
      const data= await gettingQuestions('newest');
      setQuestions(data);
    };
    fetchData();
  }
  catch(error){
  console.log(err);
  alert('Error fetching questions:');
  
  };

  
  }, []);

  return (
    <>
      <QuestionNavbar />
      {questions.length === 0 ? (
        <h3 className="m-3">No questions found</h3>
      ) : (<>
      
      
          <Row className={styles.scrollable}>
            {questions.map((question) => (
              <Col key={question._id} md={4} className="my-5">
                <DisplayQuestion question={question} />
              </Col>
            ))}
          </Row>
        
      </>)}
    </>
  );
}
