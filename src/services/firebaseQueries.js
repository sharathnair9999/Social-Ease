import { collection, doc, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

export const postsRef = collection(db, "posts");

export const latestUserPostsQuery = (profileId) =>
  query(postsRef, where("uid", "==", profileId), orderBy("createdAt", "desc"));

export const queryUserCollection = query(collection(db, "users"));

export const userDocQuerybyId = (uid) => doc(db, "users", uid);

export const singlePostQuery = (postId) => doc(db, "users", postId);

export const feedPostsQuery = (following, uid) => query(postsRef); // will update this query to actual feed posts query once followers, following functionality is done

export const explorePostsQuery = query(postsRef);

export const postByIdRef = (postId) => doc(db, "posts", postId);

export const userLikedPostsQuery = (userId) =>
  query(postsRef, where("likes", "array-contains", userId));
