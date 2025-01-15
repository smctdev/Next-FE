const emojis: any = {
  "(y)":
    "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f44d.png",
};
export default function formatEmojis(
  content: string,
  height: number,
  width: number
) {
  const imageurl = emojis[content];
  return imageurl ? (
    <img src={`${imageurl}`} className={`h-${height} w-${width}`} />
  ) : (
    content
  );
}
