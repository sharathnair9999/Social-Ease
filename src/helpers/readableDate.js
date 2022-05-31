export const getReadableDate = (timestamp) =>
  new Date(timestamp.seconds * 1000).toLocaleString();
