// https://www.geeksforgeeks.org/get-the-relative-timestamp-difference-between-dates-in-javascript/
export const getRelativeDate = (time: number) => {
  const min = 60 * 1000;
  const hour = min * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;
  const currDate = Date.now(); // milliseconds in today's date
  const prevDate = time * 1000; // milliseconds in previous date
  const difference = currDate - prevDate;

  if (difference < min) {
    return Math.round(difference / 1000) + ' seconds ago';
  } else if (difference < hour) {
    return Math.round(difference / min) + ' minutes ago';
  } else if (difference < day) {
    return Math.round(difference / hour) + ' hours ago';
  } else if (difference < week) {
    return Math.round(difference / day) + ' days ago';
  } else if (difference < month) {
    return Math.round(difference / week) + ' weeks ago';
  } else if (difference < year) {
    return Math.round(difference / month) + ' months ago';
  } else {
    return Math.round(difference / year) + ' years ago';
  }
};

export const formatCreatedDate = (dateCreated: number) => {
  const date = new Date(dateCreated * 1000);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.toLocaleString('en-US', { day: 'numeric' });
  const year = date.toLocaleString('en-US', { year: 'numeric' });
  return `${month} ${day}, ${year}`;
};
