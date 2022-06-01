import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    uid: "",
    photoURL: "",
    username: "",
  });

  useEffect(() => {
    (async () => {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        console.log(postSnap.data(), "Single post data");
        const userRef = doc(db, "users", postSnap.data().uid);
        const userSnap = await getDoc(userRef);
        console.log(userSnap.data(), "userinfo from single post page");
      } else {
        console.log("No such document!"); // Will remove the comments once the page is designed
      }
    })();
  }, [postId]);

  return <div>SinglePost</div>;
};

export default SinglePost;
