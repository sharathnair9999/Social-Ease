export const sortPosts = (list, sortBy) => {
  switch (sortBy) {
    case "TRENDING":
      return [...list].sort((a, b) => b.likes.length - a.likes.length);
    case "LATEST":
      return [...list].sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      );
    case "OLDEST":
      return [...list].sort(
        (a, b) => a.createdAt.seconds - b.createdAt.seconds
      );
    default:
      return [...list].sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      );
  }
};
