import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Button } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import styles from '@/styles/Home.module.css';

const Editor = dynamic(() => import('./editor'), { ssr: false });

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData(); 
    data.set('title', title);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://localhost:8080/post', {
      method: 'PUT',
      body: data,
    });
    if(response.ok) {
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
  }

  return (
    <>
    <h2>Post Edit</h2>
    <div className={styles.freeboard}>
    <label htmlFor="postTitle" className="form-label h5">
        Title
    </label>
    <form onSubmit={updatePost}>
      <div className={styles.postTitle}>
      <input type="title"
            placeholder={'Title'}
            value={title}
            onChange={ev => setTitle(ev.target.value)} />
      </div>
      <div className="mt-3">
          <label htmlFor="postImage" className="form-label h5">
            Image
          </label>
      </div>
      <div className={styles.postImage}>
        <input type="file"
        onChange={ev => setFiles(ev.target.files)} />
      </div>
      <div className="mt-3">
        <label htmlFor="postContent" className="form-label h5">
            Content
        </label>
      </div>
      <div className={styles.content} >
        <Editor onChange={setContent} value={content} />
      </div>
      <div className="d-flex flex-row-reverse mx-3">
      <Button className={styles.postBtn}>Update post</Button>
      <div className="mx-3"><Button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</Button></div>
      </div>
    </form>
    </div>
    </>
  );
}
