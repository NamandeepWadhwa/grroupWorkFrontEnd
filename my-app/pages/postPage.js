import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {formatISO9075} from "date-fns";
import { Button, Image } from 'react-bootstrap';
import styles from '@/styles/Home.module.css';

export default function PostPage() {
  const [postInfo,setPostInfo] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    fetch(`http://localhost:8080/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);

  const handleCancel = () => {
    navigate('/');
  };

  const handleEditClick = () => {
    navigate(`/edit/${id}`);
  };

  if (!postInfo) return '';

  return (
    <>
        <div className="d-flex align-items-center">
            <div className="w-75 justify-content-start">
            <Button type="button" className={styles.backBtn} onClick={handleCancel}>
                <Image
                    src="/left_9666549.png"
                    alt="Back icon"
                    className={styles.backIcon}
                    width={42}
                    height={42}
                />
            </Button>
            </div>
            <Button className={styles.postBtn} onClick={handleEditClick}>
                Edit post
            </Button>
        </div>
    <div className={styles.freeboard}>
        <div className="d-flex">
        <div className={styles.postHeader}> 
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        </div>
        </div>
      <div className={styles.image}>
        <img src={`http://localhost:8080/${postInfo.image}`} alt=""/>
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
    </>
  );
}
