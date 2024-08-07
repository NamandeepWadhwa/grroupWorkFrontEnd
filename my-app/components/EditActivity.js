import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Image, Col } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '@/styles/CreateActivity.module.css';
import { gettingUser } from '../lib/gettingUser';

const EditActivity = () => {
  const [activityData, setActivity] = useState({
    activity: {
      title: '',
      date: '',
      location: '',
      link: '',
      image: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchActivity = async () => {
      if (id) {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/${id}`);
          const { activity } = res.data;
          setActivity({
            activity: {
              ...activity,
              date: formatDate(activity.date)
            }
          });
        } catch (error) {
          console.error('Error fetching activity:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchActivity();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivity((prevData) => ({
      activity: {
        ...prevData.activity,
        [name]: value
      }
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const handleFileRemove = () => {
    setFile(null);
    setFilePreview(null);
    document.getElementById('formFile').value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = gettingUser();

    let image = activityData.activity.image;
    if (file) {
      try {
        const imageFormData = new FormData();
        imageFormData.append("file", file);
        imageFormData.append("upload_preset", "events");
        imageFormData.append("cloud_name", "dvw5kbnsi");

        const response = await fetch(process.env.NEXT_PUBLIC_IMAGESTORE, {
          method: "POST",
          body: imageFormData,
        });
        const data = await response.json();
        image = data.secure_url;
      } catch (err) {
        console.log(err);
        setError("An error occurred during file upload.");
        return;
      }
    }

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/${id}`, {
        ...activityData.activity,
        image
      }, {
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      });
      router.push(`/activities/${id}`);
    } catch (error) {
      console.error('Error updating activity:', error.response?.data || error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      const { token } = gettingUser();

      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/${id}`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        router.push('/activities');
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (loading) return <div>Loading...</div>;
  if (!activityData.activity) return <div>Activity not found</div>;

  const { activity } = activityData;

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
                value={activity.date}
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
            {activity.image && (
              <div className="mb-3">
                <p className="text-muted">Current Image</p>
                <Col md={6}>
                  <Image
                    src={activity.image}
                    alt="Current Image"
                    thumbnail
                    style={{ height: '45vh' }}
                  />
                </Col>
              </div>
            )}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              {filePreview && (
                <div className="mb-3">
                  <Col md={6}>
                    <Image
                      src={filePreview}
                      alt="Preview"
                      thumbnail
                      style={{ height: '45vh' }}
                    />
                  </Col>
                </div>
              )}
              <Form.Control type="file" onChange={handleFileChange} />
              {file && (
                <Button variant="danger" onClick={handleFileRemove} className="mt-2">
                  Remove File
                </Button>
              )}
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
