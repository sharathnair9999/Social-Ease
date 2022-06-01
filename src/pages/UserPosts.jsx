import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostCard } from "../components";
import { db } from "../firebase-config";

const UserPosts = () => {
  const { profileId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("uid", "==", profileId));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({
            postId: doc.id,
            ...doc.data(),
          });
        });
        setUserPosts(posts);
      },
      (error) => {
        toast.error(error.message);
      }
    );
    return unsubscribe;
  }, [profileId]);

  return (
    <div className="w-full">
      {userPosts.length === 0
        ? "No Posts Here Yet"
        : userPosts?.map((post) => (
            <PostCard key={post.postId} postInfo={post} />
          ))}
    </div>
  );
};

export default UserPosts;
