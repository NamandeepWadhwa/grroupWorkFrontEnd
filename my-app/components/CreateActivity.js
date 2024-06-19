import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '@/styles/CreateActivity.module.css';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';


const CreateActivity = () => {
  const [newActivity, setNewActivity] = useState({
    title: '',
    date: '',
    location: '',
    link: '',
    image: null,
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewActivity({ ...newActivity, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newActivity.title);
    formData.append('date', newActivity.date);
    formData.append('location', newActivity.location);
    formData.append('link', newActivity.link);
    formData.append('image', newActivity.image);

    try {
      console.log(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities`);
      await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/activities');
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <Container className={styles.container}>
         <Link href="/activities" passHref={true} legacyBehavior={true}>
        <a className={styles.backLink}>
          <FaArrowLeft className={styles.arrowIcon} />
        </a>
      </Link>
      <h1>Create a New Activity</h1>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="activityTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newActivity.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="activityDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newActivity.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="activityLocation" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={newActivity.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="activityLink" className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={newActivity.link}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="activityImage" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />
            </Form.Group>
            <Button type="submit">Create Activity</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateActivity;
