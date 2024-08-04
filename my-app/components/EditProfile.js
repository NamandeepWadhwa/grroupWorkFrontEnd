import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '@/styles/Profile.module.css';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    profilePicture: '',
    bio: '',
    yearOfEntrance: '',
    program: '',
    activities: [],
    privateFields: {
      bio: false,
      yearOfEntrance: false,
      program: false,
    },
  });
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.push('/user/login');
        return;
      }
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/profile/${userId}`);
        setProfileData({
          firstName: res.data.first_name || '',
          lastName: res.data.last_name || '',
          profilePicture: res.data.profile_picture || '',
          bio: res.data.bio || '',
          yearOfEntrance: res.data.entrance_year || '',
          program: res.data.program || '',
          activities: res.data.activities || [],
          privateFields: res.data.private_fields || {
            bio: false,
            yearOfEntrance: false,
            program: false,
          },
        });
        setImagePreview(res.data.profile_picture);
        setUserId(userId);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profilePicture: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handlePrivateToggle = (field) => {
    setProfileData({
      ...profileData,
      privateFields: { ...profileData.privateFields, [field]: !profileData.privateFields[field] },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', profileData.firstName);
    formData.append('last_name', profileData.lastName);
    formData.append('profile_picture', profileData.profilePicture);
    formData.append('bio', profileData.bio);
    formData.append('entrance_year', profileData.yearOfEntrance);
    formData.append('program', profileData.program);
    formData.append('private_fields', JSON.stringify(profileData.privateFields));

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKENDURL}/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully!');
      router.push(`/profile`);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container className={styles.container}>
      <h1>Edit Profile</h1>
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
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                readOnly
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
              <div className={styles.privateBtn}>
              <Button variant="secondary" onClick={() => handlePrivateToggle('bio')}>
                {profileData.privateFields.bio ? 'Make Public' : 'Make Private'}
              </Button>
              </div>
            </Form.Group>
            <Form.Group controlId="yearOfEntrance" className="mb-3">
              <Form.Label>Year of Entrance</Form.Label>
              <Form.Control
                type="number"
                name="yearOfEntrance"
                value={profileData.yearOfEntrance}
                onChange={handleInputChange}
              />
              <div className={styles.privateBtn}>
              <Button variant="secondary" onClick={() => handlePrivateToggle('yearOfEntrance')}>
                {profileData.privateFields.yearOfEntrance ? 'Make Public' : 'Make Private'}
              </Button>
              </div>
            </Form.Group>
            <Form.Group controlId="program" className="mb-3">
              <Form.Label>Program</Form.Label>
              <Form.Control
                type="text"
                name="program"
                value={profileData.program}
                onChange={handleInputChange}
              />
              <div className={styles.privateBtn}>
              <Button variant="secondary" onClick={() => handlePrivateToggle('program')}>
                {profileData.privateFields.program ? 'Make Public' : 'Make Private'}
              </Button>
              </div>
            </Form.Group>
            <Button type="submit">Update Profile</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProfile;
