import React, { useState, useEffect } from 'react';
 import { Container, Form, Button, Card } from 'react-bootstrap';
 import axios from 'axios';
 import { useRouter } from 'next/router';
 import styles from '@/styles/Profile.module.css';

 const CreateProfile = () => {
   const [profileData, setProfileData] = useState({
     first_name: '',
     last_name: '',
     profile_picture: '',
     bio: '',
     entrance_year: '',
     program: ''
   });
   const [imagePreview, setImagePreview] = useState('');
   const router = useRouter();
   const [userId, setUserId] = useState(null);

   useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
        setUserId(storedUserId);
    }
   }, [router])

   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setProfileData({ ...profileData, [name]: value });
   };

   const handleImageChange = (e) => {
     const file = e.target.files[0];
     setProfileData({ ...profileData, profile_picture: file });
     setImagePreview(URL.createObjectURL(file));
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     const formData = new FormData();
     formData.append('first_name', profileData.first_name);
     formData.append('last_name', profileData.last_name);
     formData.append('profile_picture', profileData.profile_picture);
     formData.append('bio', profileData.bio);
     formData.append('entrance_year', profileData.entrance_year);
     formData.append('program', profileData.program);

     try {
       const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKENDURL}/profile/${userId}`, formData, {
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
             <Form.Group controlId="profile_picture" className="mb-3">
               <Form.Label>Profile Picture</Form.Label>
               <Form.Control type="file" name="profile_picture" onChange={handleImageChange} />
               {imagePreview && <img src={imagePreview} alt="Profile Preview" className={styles.profileImage} />}
             </Form.Group>
             <Form.Group controlId="first_name" className="mb-3">
               <Form.Label>First Name</Form.Label>
               <Form.Control
                 type="text"
                 name="first_name"
                 value={profileData.first_name}
                 onChange={handleInputChange}
                 required
               />
             </Form.Group>
             <Form.Group controlId="last_name" className="mb-3">
               <Form.Label>Last Name</Form.Label>
               <Form.Control
                 type="text"
                 name="last_name"
                 value={profileData.last_name}
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
             <Form.Group controlId="entrance_year" className="mb-3">
               <Form.Label>Year of Entrance</Form.Label>
               <Form.Control
                 type="number"
                 name="entrance_year"
                 value={profileData.entrance_year}
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
