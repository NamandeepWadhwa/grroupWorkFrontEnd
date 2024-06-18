import { Row,Col,Container,Button} from "react-bootstrap";
import Image from 'next/image';
import Router from "next/router";
import Link from 'next/link';
import  styles from "@/styles/QuesetionDisplay.module.css";

export default function test() {

    return (
        <Container className={`${styles.scrollable} bg-white`}>
          <Row className="my-2">
            <Col>
               <Link href="/questions"><Image src="/backArrowQuestions.png" width={50} height={50} alt="back arrow image "></Image></Link> 
            </Col>
          </Row>
            <Row className="my-3">
                <Col >
                    <p><h3>Title: </h3>Hakishi hiosh thesot soigshodf la e</p>
                    <p><h3>Description</h3>Hakishi hiosh thesot soigshodf la e</p>
                    <Button variant="white"><Image src="/questionUpvote.png" width={20} height={20} alt="like button"></Image> 50</Button>
                </Col>
            </Row>
        </Container>
    )

}