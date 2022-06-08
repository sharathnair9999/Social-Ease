import { collection, doc, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

export const postsRef = collection(db, "posts");

export const latestUserPostsQuery = (profileId) =>
  query(postsRef, where("uid", "==", profileId), orderBy("createdAt", "desc"));

export const queryUserCollection = query(collection(db, "users"));

export const userDocQuerybyId = (uid) => doc(db, "users", uid);

export const singlePostQuery = (postId) => doc(db, "users", postId);

export const feedPostsQuery = (following, uid) =>
  query(
    collection(db, "posts"),
    where("uid", "in", [...following, uid]),
    orderBy("createdAt", "desc")
  ); // will update this query to actual feed posts query once followers, following functionality is done

export const explorePostsQuery = query(
  collection(db, "posts"),
  orderBy("createdAt", "desc")
);

export const postByIdRef = (postId) => doc(db, "posts", postId);

export const userLikedPostsQuery = (userId) =>
  query(postsRef, where("likes", "array-contains", userId));
