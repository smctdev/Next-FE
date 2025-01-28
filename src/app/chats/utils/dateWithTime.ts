import { format } from "date-fns";

export default function dateWithTime(date: any) {
  const formattedDate = format(date, "MMMM dd, yyyy 'at' h:mm a");
  return formattedDate;
}
