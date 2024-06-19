import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import styles from "@/styles/Home.module.css";

const Editor = dynamic(() => import('../pages/editor'), { ssr: false });

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (files) {
      formData.append('file', files[0]);
    }
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/freeboard`, formData);
      if (res.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  useEffect(() => {
    if (redirect) {
      router.push('/freeboard');
      setRedirect(false);
    }
  }, [redirect, router]);

  const handleCancel = () => {
    router.push('/freeboard');
  };

  return (
    <Row className={styles.freeboard}>
      <Col xs={12} className={styles.createPost}>
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.postContainer}>
            <div className={styles.postTitle}>
              <label htmlFor="postTitle" className="form-label h5">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="postTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.postImage}>
              <div>
                <label htmlFor="postImage" className="form-label h5">
                  Image
                </label>
              </div>
              <input id="postImage" type="file" onChange={(e) => setFiles(e.target.files)} />
            </div>
            <div className={styles.content}>
              <label htmlFor="postContent" className="form-label h5">
                Content
              </label>
              <Editor value={content} onChange={setContent} />
            </div>
            <div className={styles.buttonContainer}>
              <Button type="submit" className={styles.postBtn}>
                Submit
              </Button>
              <Button type="button" className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Col>
    </Row>
  );
};

export default CreatePost;
