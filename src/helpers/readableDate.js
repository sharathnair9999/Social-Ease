export const getReadableDate = (timestamp) =>
  new Date(timestamp * 1000).toLocaleString();

export const getMonthYear = (timeStamp) => {
  const res = new Date(timeStamp * 1000);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[res.getMonth()]} ${res.getFullYear()}`;
};
