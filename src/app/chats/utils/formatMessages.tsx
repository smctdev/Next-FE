import Link from "next/link";
import formatEmojis from "./formatEmojis";

export default function formatMessages(
  content: string,
  height: number,
  width: number
) {
  // More precise URL regex (ensures proper domain or IP format)
  const urlPattern =
    /\b(https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(?:\/[^\s]*)?|https?:\/\/(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?(?:\/[^\s]*)?|(?<!@)\b[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b(?!@))\b/g;

  return content.split(urlPattern).map((part, index) => {
    if (urlPattern.test(part)) {
      const link = part.startsWith("http") ? part : `https://${part}`;

      return (
        <span key={index}>
          <Link
            href={link}
            className="font-bold underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </Link>
        </span>
      );
    }

    return <span key={index}>{formatEmojis(part, height, width)}</span>;
  });
}
