import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '@/styles/CreateActivity.module.css';

const EditActivity = ({ id }) => {
  const [activityData, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/${id}`);
        setActivity(res.data);
      } catch (error) {
        console.error('Error fetching activity:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActivity();
    }
    fetchActivity();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivity({
      ...activityData,
      activity: {
        ...activityData.activity,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/${id}`, activity);
      router.push(`/activities/${id}`);
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/${id}`);
        router.push('/activities');
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!activityData) return <div>Activity not found</div>;

  const { activity } = activityData;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Container className={styles.container}>
      <h1>Edit Activity</h1>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="activityTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={activity.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="activityDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formatDate(activity.date)}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="activityLocation" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={activity.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="activityLink" className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={activity.link}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit">Update Activity</Button>
          </Form>
          <Button variant="danger" onClick={handleDelete} className="mt-3">
            Delete Activity
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditActivity;
