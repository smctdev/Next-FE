import Link from "next/link";
import formatEmojis from "./formatEmojis";

export default function formatMessages(
  content: string,
  height: number,
  width: number
) {
  const urlPattern =
    /\b(?:https?:\/\/)?(?:[a-zA-Z0-9-]+\.[a-zA-Z]{2,}|[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)(?::\d+)?(?:\/[^\s]*)?\b/g;

  const hasHttpOrHttpsPattern = /\b(?:https?:\/\/)/i;

  const hasHttpOrHttpsUrl = hasHttpOrHttpsPattern.test(content);

  const isUrl = urlPattern.test(content);

  const formattedContent = hasHttpOrHttpsUrl ? content : `https://${content}`;

  if (isUrl) {
    return (
      <Link
        href={`${formattedContent}`}
        className="font-bold underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </Link>
    );
  } else {
    return formatEmojis(content, height, width);
  }
}
