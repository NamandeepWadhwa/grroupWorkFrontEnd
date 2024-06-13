import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import { Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";
import axios from 'axios';
import dynamic from 'next/dynamic';
import IndexPage from './indexPage';
import PostPage from './postPage';
import EditPost from './editPost';
import styles from "@/styles/Home.module.css";

const Editor = dynamic(() => import('./editor'), { ssr: false });

const Freeboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const options = ["Title", "Contents", "Author"];

  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.set('title', title);
    formData.set('content', content);
    formData.set('file', files[0]);
    event.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/post`, formData);
      if (res.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate('/');
      setRedirect(false);
    }
  }, [redirect, navigate]);

  const handleCancel = () => {
    navigate('/');
  };

  const renderPostList = () => (
    <>
      <Row className={styles.btnContainer}>
        <Col className="d-flex justify-content-end">
          <Button className={styles.postBtn} onClick={() => navigate('/createPost')}>
            Create Post
          </Button>
        </Col>
      </Row>
      <Row className={styles.freeboard}>
        <Row className={styles.postSection}>
          <IndexPage />
        </Row>
        <Row className="d-flex">
          <Col xs={12} md={4} style={{ flex: 1 }}>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.dropdownMenu}>
                {selectedOption || 'Select an option'}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                {options.map((option, index) => (
                  <Dropdown.Item key={index} onClick={() => handleOptionClick(option)}>
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={12} md={8} style={{ flex: 4 }}>
            <InputGroup>
              <FormControl placeholder="Type search keyword..." aria-label="Search" />
            </InputGroup>
          </Col>
        </Row>
      </Row>
    </>
  );

  const renderCreatePost = () => (
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
              <input id="postImage" type="file" onChange={(ev) => setFiles(ev.target.files)} />
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

  return (
    <Container>
      <Routes>
        <Route path="/" element={renderPostList()} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/createPost" element={renderCreatePost()} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </Container>
  );
};

const App = () => (
  <BrowserRouter>
    <Freeboard />
  </BrowserRouter>
);

export default App;
