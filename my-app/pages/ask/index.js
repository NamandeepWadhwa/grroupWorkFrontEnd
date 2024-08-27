import { useEffect, useState } from "react";
import DisplayQuestion from "@/components/questiondispaly";
import  styles from "@/styles/Question.module.css";
import QuestionNavbar from "@/components/questionNavbar";
import { questionAtom } from "@/questinJoti/question";
import { useAtom } from "jotai";
import { gettingQuestions } from "@/lib/question/gettingQuestionNewest";
import { Container } from "react-bootstrap";

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
      
      
          <Container>
            {questions.map((question) => (
              
                
                <DisplayQuestion question={question} />
              
            ))}
          </Container>
        
      </>)}
    </>
  );
}
