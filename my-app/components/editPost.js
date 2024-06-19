import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from 'react-bootstrap';
import styles from '@/styles/Home.module.css';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('../pages/editor'), { ssr: false });

const EditPost = ({ postInfo }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (postInfo) {
      setTitle(postInfo.title || '');
      setContent(postInfo.content || '');
    }
  }, [postInfo]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('content', content);
    if (files?.[0]) {
      data.append('file', files[0]);
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/freeboard/edit/${postInfo._id}`, {
      method: 'PUT',
      body: data,
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  useEffect(() => {
    if (redirect) {
      router.push(`/freeboard/${postInfo._id}`);
    }
  }, [redirect, router, postInfo._id]);

  const handleCancel = () => {
    router.push("/freeboard");
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

export default EditPost;
