import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import styles from '@/styles/Home.module.css';
import Editor from './editor';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/post/${id}`)
      .then(response => response.json())
      .then(postInfo => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.append('file', files?.[0]);
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/post`, {
      method: 'PUT',
      body: data,
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  useEffect(() => {
    if (redirect) {
      navigate(`/post/${id}`);
    }
  }, [redirect, navigate, id]);

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <h2>Post Edit</h2>
      <div className={styles.freeboard}>
        <form onSubmit={updatePost}>
          <div className={styles.postTitle}>
            <label htmlFor="postTitle" className="form-label h5">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={ev => setTitle(ev.target.value)}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="postImage" className="form-label h5">Image</label>
            <input
              type="file"
              onChange={ev => setFiles(ev.target.files)}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="postContent" className="form-label h5">Content</label>
            <Editor
              value={content}
              onChange={setContent}
            />
          </div>
          <div className="d-flex flex-row-reverse mx-3">
            <Button type="submit" className={styles.postBtn}>Update post</Button>
            <Button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</Button>
          </div>
        </form>
      </div>
    </>
  );
}
