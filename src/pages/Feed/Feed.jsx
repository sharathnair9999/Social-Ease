import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  PostCard,
  PostEditor,
  PostSkeleton,
} from "../../components";
import { fetchFeedPosts } from "../../services";
// Feed posts should contain only the posts of people that you follow. Will handle this after implementing follow feature
const Feed = () => {
  const { displayName, photoURL, uid } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {
    loggedUser: { following },
  } = useSelector((state) => state.user);
  const ref = React.createRef();

  const { feedPosts, feedPostsLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    following.length > 0 && dispatch(fetchFeedPosts(following));
  }, [dispatch, uid, following]);

  const filteredFeedPosts =
    feedPosts &&
    [...feedPosts]
      .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
      .filter(
        (post) =>
          following.some((user) => user === post.uid) || post.uid === uid
      );

  return (
    <div>
      <Modal showModal={showModal}>
        <PostEditor ref={ref} newPost setShowModal={setShowModal} />
      </Modal>

      <div className=" shadow-md border-[1px] flex flex-col mb-4">
        <section className="flex items-center justify-start gap-4 px-2 py-2  rounded-md">
          <img
            src={photoURL}
            alt={displayName}
            className={`w-12 h-12 rounded-full object-cover cursor-pointer`}
            onClick={() => navigate(`/profile/${uid}`)}
          />
          <input
            className="font-light border-none outline-none w-full"
            value={"What's on your mind?"}
            readOnly
            onClick={() => setShowModal(true)}
          />
          <Button
            onClick={() => setShowModal(true)}
            className="bg-cta-dark text-white ml-auto "
          >
            Post
          </Button>
        </section>
      </div>
      {feedPostsLoading &&
        [...Array(10)].map((_, id) => (
          <PostSkeleton key={id} textOnly={id % 2 === 0} />
        ))}
      {filteredFeedPosts.length === 0 ? (
        <p className="w-full text-center text-2xl font-bold">
          Seems like you dont follow anyone
        </p>
      ) : (
        filteredFeedPosts.map((post) => (
          <PostCard key={post.postId} postInfo={post} />
        ))
      )}
    </div>
  );
};

export default Feed;
