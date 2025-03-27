import { formatDistanceToNow, parseISO } from "date-fns";

export default function commentDateFormat(date: any) {
  const distance = formatDistanceToNow(parseISO(date), { addSuffix: true });

  const cleanDistance = distance.replace(/^about /, "");

  const [amount, unit] = cleanDistance.split(" ");

  if (unit === "hour" || unit === "hours") {
    return `${amount}h`;
  } else if (unit === "day" || unit === "days") {
    return `${amount}d`;
  } else if (unit === "month" || unit === "months") {
    return `${amount}mos`;
  } else if (unit === "year" || unit === "years") {
    return `${amount}y`;
  }

  return cleanDistance;
}
