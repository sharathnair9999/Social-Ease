export const sortByLatest = (list, bool) => {
  const newList = bool
    ? list.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
    : list.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
  return newList;
};

export const sortByTrending = (list, bool) => {
  const newList = bool
    ? list.sort((a, b) => b.likes.length - a.likes.length)
    : list.sort((a, b) => a.likes.length - b.likes.length);
  return newList;
};
