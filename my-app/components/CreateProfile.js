import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '@/styles/Profile.module.css';

const CreateProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    profilePicture: '',
    bio: '',
    yearOfEntrance: '',
    program: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profilePicture: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePicture', profileData.profilePicture);
    formData.append('firstName', profileData.firstName);
    formData.append('lastName', profileData.lastName);
    formData.append('bio', profileData.bio);
    formData.append('yearOfEntrance', profileData.yearOfEntrance);
    formData.append('program', profileData.program);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/profile/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Profile created successfully!');
      router.push('/profile');
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <Container className={styles.container}>
      <h1>Create Profile</h1>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="profilePicture" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" name="profilePicture" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Profile Preview" className={styles.profileImage} />}
            </Form.Group>
            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="bio" className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="yearOfEntrance" className="mb-3">
              <Form.Label>Year of Entrance</Form.Label>
              <Form.Control
                type="number"
                name="yearOfEntrance"
                value={profileData.yearOfEntrance}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="program" className="mb-3">
              <Form.Label>Program</Form.Label>
              <Form.Control
                type="text"
                name="program"
                value={profileData.program}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button type="submit">Create Profile</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateProfile;
