import Post from "./post"
import {useEffect, useState} from "react";

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/post`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
    {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </>
  );
}
