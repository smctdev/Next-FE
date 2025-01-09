export default function formatEmojis(
  content: string,
  height: number,
  width: number
) {
  switch (content) {
    case "(y)":
      return (
        <img
          src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f44d.png"
          className={`h-${height} w-${width}`}
        />
      );
    default:
      return content;
  }
}
