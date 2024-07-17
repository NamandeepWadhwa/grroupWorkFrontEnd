import { useState, useEffect } from "react";
import CommentForm from "./commentForm";
import style from "@/styles/Comment.module.css";
import Comment from "./comment";

const Comments = ({ postId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/freeboard/${postId}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      console.log('Fetched comments:', data);
      setBackendComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const addComment = async (text) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/freeboard/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          userId: userId,
          body: text,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const updateComment = async (text, commentId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: text }),
      });
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
      fetchComments();
      setActiveComment(null);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div className="comments">
      <div className={style.textareaContainer}>
        <h3 className="comments-title">Comments</h3>
        <CommentForm submitLabel="Write" handleSubmit={addComment} />
      </div>
      <div className="comments-container">
        {backendComments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
