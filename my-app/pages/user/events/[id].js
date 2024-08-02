import React from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";
import Link from "next/link";
import styles from "@/styles/Question.module.css";
import { formatDate } from "@/lib/DateFromat/askDateFormat";
import {getEventById} from "@/lib/evnet/getEventById";
import { useEffect,useState } from "react";

const EventPage = () => {
  const [event, setEvent] = useState(null);
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    const fetchData = async () => {
      const data = await getEventById(id);
      if(data === null){
        router.push("/events");
      }
      console.log(data);
      setEvent(data);
    };
    fetchData();
  });


if (event == null) {
  return <h1>Loading...</h1>;
}
  return (
    <Container className={styles.scrollable}>
      <Link href="/user/events">
        <Image
          src="/backArrowQuestions.png"
          width={50}
          height={50}
          alt="back arrow"
        />
      </Link>
      <h1 className="mt-4">{event.title}</h1>
      <p>
        <strong>Description:</strong> {event.description}
      </p>
      {event.imageUrl && (
        <Row className="mt-3">
          <Col xs={12} md={12}>
            <Image
              src={event.imageUrl}
              alt={event.title}
              fluid
              className="object-fit-cover"
              style={{ height: "300px" }}
            />
          </Col>
        </Row>
      )}
      <p>
        <strong>Created At:</strong> {formatDate(event.created_at)}
      </p>
      {event.category && event.category.length > 0 && (
        <div className="mt-3">
          <strong>Categories:</strong>{" "}
          {event.category.map((category, index) => (
            <Badge key={index} bg="secondary" className="me-1">
              {category}
            </Badge>
          ))}
        </div>
      )}
    </Container>
  );
};

export default EventPage;
