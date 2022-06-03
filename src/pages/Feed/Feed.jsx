import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Modal, PostCard, PostEditor } from "../../components";
import { fetchFeedPosts } from "../../services";
// Feed posts should contain only the posts of people that you follow. Will handle this after implementing follow feature
const Feed = () => {
  const { displayName, photoURL, uid } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const ref = React.createRef();

  const { feedPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedPosts(uid));
  }, [dispatch, uid]);

  return (
    <div>
      <Modal showModal={showModal}>
        <PostEditor ref={ref} newPost setShowModal={setShowModal} />
      </Modal>
      <div className=" shadow-md border-[1px] flex flex-col mb-4">
        <section className="flex items-center justify-start gap-4 px-2 py-4  rounded-md">
          <Link to={`/profile/${uid}`} className="max-w-[3rem]">
            <img
              src={photoURL}
              alt={displayName}
              className={`w-12 h-12 rounded-full object-cover `}
            />
          </Link>
          <input
            className="font-light border-none outline-none w-1/2"
            value={"What's on your mind?"}
            readOnly
            onClick={() => setShowModal(true)}
          />
          <Button
            onClick={() => setShowModal(true)}
            className="bg-cta-dark text-white ml-auto "
          >
            New Post
          </Button>
        </section>
      </div>

      {feedPosts?.map((post) => (
        <PostCard key={post.postId} postInfo={post} />
      ))}
    </div>
  );
};

export default Feed;
