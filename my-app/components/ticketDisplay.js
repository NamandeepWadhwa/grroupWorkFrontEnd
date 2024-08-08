import Button from "react-bootstrap/Button";
import Router from "next/router";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { formatDate } from "@/lib/DateFromat/askDateFormat";
import Avatar from "@/components/Avatar";
export default function TicketDisplay({ ticket }) {
  const router = Router;
  

  return (
    <>
      <Row className="border my-3 rounded  bg-white">
        <Avatar id={ticket.user} />
        <Col className="m-2" md={12}>
          {ticket.title.substr(0, 100)}
        </Col>
        <Col className="m-2" md={12}>
          {ticket.description.substr(0, 250)}
        </Col>
       
        <Col className="m-2" md={12}>
            
              <Button variant="secondary" className="me-2 mb-2">
                {ticket.isActive==true?"Active":"Inactive"}
              </Button>
           
        </Col>
        <Col className="m-2" md={12}>
          {"Posted on " + formatDate(ticket.created_at)}
        </Col>

        <Col className="m-2 " md={12}>
          <Button
            variant="danger"
            onClick={(e) => {
              e.preventDefault();
              router.push(`./ticket/${ticket._id}`);
            }}
          >
            View ticket
          </Button>
        </Col>
      </Row>
    </>
  );
}
