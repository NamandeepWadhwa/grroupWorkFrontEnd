import { useRouter } from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/QuesetionDisplay.module.css";
import { Row, Col, Container, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import {createQuestion} from '@/lib/question/createQuestion';
import Router from "next/router";

export default function Create() {
  const router = useRouter();

  const [question, setQuestion] = useState({ title: '', description: '', tags: [] });
  const [newTag, setNewTag] = useState('');

  const handleTagAdd = () => {
    if (newTag && !question.tags.includes(newTag)) {
      setQuestion({ ...question, tags: [...question.tags, newTag] });
      setNewTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setQuestion({ ...question, tags: question.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await createQuestion(question);
    router.push('/user/questions');
  };

  return (
    <Container className={`${styles.scrollable} bg-white`}>
      <Row className="my-2">
        <Col>
          <Link href="/user/questions"><Image src="/backArrowQuestions.png" width={50} height={50} alt="back arrow image"></Image></Link>
        </Col>
      </Row>
      
      <Row className="my-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              value={question.title}
              onChange={(e) => setQuestion({ ...question, title: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              value={question.description}
              onChange={(e) => setQuestion({ ...question, description: e.target.value })}
              
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <div>
              {question.tags.map((tag, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  className="me-2 mb-2"
                  onClick={() => handleTagRemove(tag)}
                >
                  {tag} <span>&times;</span>
                </Button>
              ))}
            </div>
            <Form.Control
              type="text"
              placeholder="Add new tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="mt-2"
            />
            <Button variant="primary" className="mt-2" onClick={handleTagAdd}>
              Add Tag
            </Button>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
