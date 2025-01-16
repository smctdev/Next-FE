import {
  formatDate,
  formatDistanceToNowStrict,
  isToday,
  isYesterday,
} from "date-fns";

export default function dateFormat(date: string) {
  const distance = formatDistanceToNowStrict(date);

  const [amount, unit] = distance.split(" ");

  if (distance === "0 seconds") {
    return "now";
  } else if (unit === "second" || unit === "seconds") {
    return `${amount}s`;
  } else if (unit === "minute" || unit === "minutes") {
    return `${amount}m`;
  } else if (unit === "hour" || unit === "hours") {
    return `${amount}h`;
  } else if (unit === "day" || unit === "days") {
    return `${amount}d`;
  } else if (unit === "month" || unit === "months") {
    return `${amount}m`;
  } else if (unit === "year" || unit === "years") {
    return `${amount}y`;
  }

  return distance;
}
