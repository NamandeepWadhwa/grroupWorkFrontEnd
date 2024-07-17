import React from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";
import Link from "next/link";
import styles from "@/styles/Question.module.css";
import { formatDate } from "@/lib/DateFromat/askDateFormat";

const EventPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const event = JSON.parse(router.query.event);

  return (
    <Container className={styles.scrollable}>
      <Link href="/events">
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
