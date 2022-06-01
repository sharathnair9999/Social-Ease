import React from "react";
import { Comment } from "./Comment";
const Comments = ({ comments }) => {
  return (
    <div className="flex flex-col w-full gap-3 py-2">
      <Comment newComment />
      {comments.map((comment) => (
        <Comment key={comment.commentId} existingCommentInfo={comment} />
      ))}
    </div>
  );
};

export default Comments;
