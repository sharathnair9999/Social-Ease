import React from "react";
import { Comment } from "./Comment";
const Comments = ({ comments, postId, postAuthor }) => {
  return (
    <div className="flex flex-col w-full gap-3 py-2">
      <Comment
        newComment
        postId={postId}
        postAuthor={postAuthor}
        comments={comments}
      />
      {comments.map((comment) => (
        <Comment
          key={comment.commentId}
          existingCommentInfo={comment}
          postId={postId}
          comments={comments}
          postAuthor={postAuthor}
        />
      ))}
    </div>
  );
};

export default Comments;
