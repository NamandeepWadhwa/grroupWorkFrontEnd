import React, { useState, useEffect } from 'react';
 import { Card, Button } from 'react-bootstrap';
 import axios from 'axios';
 import Link from 'next/link';
 import styles from '@/styles/Profile.module.css';

 const Profile = () => {
   const [profileData, setProfileData] = useState({
     first_name: '',
     last_name: '',
     profile_picture: '',
     bio: '',
     entrance_year: '',
     program: '',
     activities: [],
     posts: []
   });
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     const fetchProfileData = async () => {
       const userId = localStorage.getItem('userId');
       if(!userId) {
         Router.push('/user/login');
         return;
       }

       try {
         const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/profile/${userId}`);
         setProfileData(res.data);
       } catch (error) {
         console.error('Error fetching profile data:', error);
       } finally {
         setLoading(false);
       }
     };

     fetchProfileData();
   }, []);

   if (loading) return <div>Loading...</div>;

   return (
     <Card className={styles.profileCard}>
       <Card.Body>
         <Card.Title>Profile</Card.Title>
         <div className={styles.profilePicture}>
           <img src="/user-icon.png" alt="User Icon"/>
         </div>
         <Card.Text>
           <strong>Name:</strong> {profileData.first_name} {profileData.last_name}<br />
           <strong>Bio:</strong> {profileData.bio}<br />
           <strong>Year of Entrance:</strong> {profileData.entrance_year}<br />
           <strong>Program:</strong> {profileData.program}<br />
         </Card.Text>
         <Link href="/profile/edit">
           <Button>Edit Profile</Button>
         </Link>
       </Card.Body>
       <Card.Footer>
         <h5>Joined Activities</h5>
         {profileData.activities.length === 0 ? (
           <p>No activities joined yet.</p>
         ) : (
           profileData.activities.map((activity) => (
             <Card key={activity._id} className="mb-3">
               <Card.Body>
                 <Card.Title>{activity.title}</Card.Title>
                 <Card.Text>
                   Date: {new Date(activity.date).toLocaleDateString()}<br />
                   Location: {activity.location}<br />
                   <a href={`/activities/${activity._id}`}>More Info</a>
                 </Card.Text>
               </Card.Body>
             </Card>
           ))
         )}
       </Card.Footer>
       <Card.Footer>
         <h5>Uploaded Posts</h5>
         {profileData.posts.length === 0 ? (
           <p>No uploaded posts yet.</p>
         ) : (
           profileData.posts.map((post) => (
            <Link href={`/freeboard/${post._id}`}>
             <Card key={post._id} className="mb-3">
               <Card.Body>
                 <Card.Title>{post.title}</Card.Title>
               </Card.Body>
             </Card>
             </Link>
           ))
         )}
       </Card.Footer>
     </Card>
   );
 };

 export default Profile;
