export const formatChatTimestamp = (date: Date) => {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  if (isToday) {
    return `Today AT ${date.toLocaleTimeString("en-US", options)}`;
  } else if (isYesterday) {
    return `Yesterday AT ${date.toLocaleTimeString("en-US", options)}`;
  } else {
    return `${date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })} AT ${date.toLocaleTimeString("en-US", options)}`;
  }
};
