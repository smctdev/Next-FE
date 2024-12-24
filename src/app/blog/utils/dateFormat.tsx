import {
  formatDate,
  formatDistanceToNowStrict,
  isToday,
  isYesterday,
} from "date-fns";

export default function dateFormat(date: string) {
  if (isToday(date)) {
    return formatDistanceToNowStrict(date) === "0 seconds"
      ? "Just now"
      : `${formatDistanceToNowStrict(date)} ago`;
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return formatDate(date, "MMMM dd, yyyy hh:mm a");
  }
}
