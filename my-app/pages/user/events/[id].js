import React from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Image } from "react-bootstrap";
import Link from "next/link";
import styles from "@/styles/Question.module.css";
import { formatDate } from "@/lib/DateFromat/askDateFormat";

const EventPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const event = JSON.parse(router.query.event);

  return (
    <Container className={styles.scrollable}>
      <Link href="/user/events">
        <Image
          src="/backArrowQuestions.png"
          width={50}
          height={50}
          alt="back arrow image"
        ></Image>
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
    </Container>
  );
};

export default EventPage;
