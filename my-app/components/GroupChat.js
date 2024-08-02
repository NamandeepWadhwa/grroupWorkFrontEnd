import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import CommentForm from "./commentForm";
import style from "@/styles/Comment.module.css";
import Comment from "./comment";

const GroupChat = ({ show, onHide, activityId }) => { 
  const [backendChat, setBackendChat] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  
  useEffect(() => {
    if (show && activityId) {
        fetchChats();
      }
  }, [show, activityId]);

  const fetchChats = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/${activityId}/chat`);
      if (!response.ok) {
        throw new Error('Failed to fetch chat');
      }
      const data = await response.json();
      console.log('Fetched chat:', data);
      setBackendChat(data.chat || []);
    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  };

  const addChat = async (text) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId || !activityId) {
        throw new Error('User ID or Activity ID is missing');
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/${activityId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId,
          userId: userId,
          body: text,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        throw new Error(`Failed to add chat: ${errorData.message}`);
      }
  
      fetchChats();
    } catch (error) {
      console.error('Error adding chat:', error);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/chat/${chatId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete chat');
      }
      fetchChats();
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
            <Modal.Title>Group Chat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="comments-container">
                    {backendChat.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        activeChat={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addChat}
                        deleteComment={deleteChat}
                        canEdit={false}
                    />
                    ))}
                </div>
                <CommentForm submitLabel="Write" handleSubmit={addChat} />
            </Modal.Body>
        </Modal>
    )
}

export default GroupChat;
