import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostCard } from "../../components";
import { db } from "../../firebase-config";

const SinglePost = () => {
  const { postId } = useParams();
  const initialPostInfo = {
    postId: "",
    postDescription: "",
    comments: [],
    likes: [],
    bookmarks: [],
    uid: "",
  };
  const [singlePost, setSinglePost] = useState(initialPostInfo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);
        setSinglePost({ postId: postSnap.id, ...postSnap.data() });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    })();
  }, [postId]);

  return (
    <div className="mx-1">
      {loading ? (
        "Loading " //will updat with an svg soon
      ) : (
        <div>
          <PostCard postInfo={singlePost} />
        </div>
      )}
    </div>
  );
};

export default SinglePost;
