import Button from 'react-bootstrap/Button';
import Router from 'next/router';
import Image from 'next/image';
import { Row } from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import{formatDate} from '@/lib/DateFromat/askDateFormat';
import Avatar from './Avatar';
export default function DisplayQuestion({question}) {
  const router=Router;

  return (
    <>
      <Row className="border-b my-3 rounded  bg-white">
        <Avatar id={question.user} />
        <Col className="m-2" md={12}>
          {question.title.substr(0, 100)}
        </Col>
        <Col className="m-2" md={12}>
          {question.description.substr(0, 250)}
        </Col>
        <Col className="m-2 flex" md={12}>
          <Image
            src="/questionUpvote.png"
            width={20}
            height={20}
            alt="upvote image"
          ></Image>
          <span className='mx-2'>{" " + question.upVotesNumber}</span>
        </Col>
        <Col className="m-2" md={12}>
          <div>
            {question.tags.map((tag, index) => (
              <Button key={index} variant="secondary" className="me-2 mb-2">
                {tag}
              </Button>
            ))}
          </div>
        </Col>
        <Col className="m-2" md={12}>
          {"Posted on " + formatDate(question.created_at)}
        </Col>

        <Col className="m-2 " md={12}>
          <Button
            variant="danger"
            onClick={(e) => {
              e.preventDefault();
              router.push(`./ask/${question._id}`);
            }}
          >
            View question
          </Button>
        </Col>
      </Row>
    </>
  );


}


