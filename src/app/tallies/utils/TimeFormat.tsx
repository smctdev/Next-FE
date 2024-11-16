const formatTime = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedTime;
};

export default formatTime;
