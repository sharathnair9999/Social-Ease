import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostCard } from "../components";
import { latestUserPostsQuery, universalSnapshot } from "../services";

const UserPosts = () => {
  const { profileId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = universalSnapshot(
      latestUserPostsQuery(profileId),
      setUserPosts,
      "postId"
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
