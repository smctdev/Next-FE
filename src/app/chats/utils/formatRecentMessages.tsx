import formatEmojis from "./formatEmojis";

export default function formatRecentMessages(
  content: string,
  height: number,
  width: number
) {
  return formatEmojis(content, height, width);
}
