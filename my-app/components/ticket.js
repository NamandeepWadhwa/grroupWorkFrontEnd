import { Row, Col } from "react-bootstrap";
import { formatDate } from "@/lib/DateFromat/askDateFormat";
import Router from "next/router";
import { delteAnswer } from "@/lib/answer/deleteanser";
import Avatar from "@/components/Avatar";

export default function TicketResponse({ ticketResponse }) {
  const router = Router;
  
  return (
    <Row className="border my-3 mx-1 rounded">
      <Avatar id={ticketResponse.user} />
      <Col md={12} className="m-2">
        {ticketResponse.response}
      </Col>
      <Col md={12} className="m-2">
        {formatDate(ticketResponse.created_at)}
      </Col>
    </Row>
  );
}
