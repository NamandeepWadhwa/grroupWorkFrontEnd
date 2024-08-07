import CommentForm from "./commentForm";
import { useEffect, useState } from "react";
import { formatISO9075 } from 'date-fns';
import style from '@/styles/Comment.module.css';

const Comment = ({
  comment,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  canEdit,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "editing";

    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const userId = localStorage.getItem('userId');
        setCurrentUserId(userId);
      }
    }, []);

    useEffect(() => {
        if (!comment) return;
      }, [comment]);

    const formattedCreatedAt = formatISO9075(new Date(comment.createdAt));


  return (
    <div key={comment._id} className={style.comment}>
      <div className={style.imgContainer}>
        <img src={comment.user.profile_picture} alt="User Icon" className={style.img} width="50" height="50"/>
      </div>
      <div className={style.cContainer}>
        <div className="d-flex">
        <div className={style.user}>
          {comment.user && `${comment.user.first_name} ${comment.user.last_name}`}
        </div>
        <div className={style.createdAt}>
          <time>{formattedCreatedAt}</time>
        </div>
        </div>
        <div className={style.bodyContainer}>
            <div className={style.body}>
            {!isEditing && <div className="comment-text">{comment.body}</div>}
            {isEditing && (
            <CommentForm
                submitLabel="Update"
                hasCancelButton
                initialText={comment.body}
                handleSubmit={(text) => updateComment(text, comment._id)}
                handleCancel={() => {
                setActiveComment(null);
                }}
            />
            )}
            </div>
            {canEdit && currentUserId === comment.user._id && (
                <>
                <div className={style.actionContainer}>
                <button
                    className={style.editBtn}
                    onClick={() =>
                    setActiveComment({ id: comment._id, type: "editing" })
                    }
                >
                    Edit
                </button>
            </div>
                </>
            )}
            {currentUserId === comment.user._id && (
                <>
                <div className={style.actionContainer}>
                <button
                    className={style.deleteBtn}
                    onClick={() => deleteComment(comment._id)}
                >
                    Delete
                </button>
            </div>
                </>
            )}            
        </div>
        {/* Optional: Reply functionality */}
        {/* {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )} */}
        {/* Optional: Display replies */}
        {/* {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply._id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment._id}
                replies={[]} // Empty for now, handle appropriately if needed
                // currentUserId={currentUserId}
              />
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Comment;
