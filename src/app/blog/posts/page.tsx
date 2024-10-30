import Link from "next/link";

export default function posts() {
  return (
    <>
      <h1>Posts</h1>
      <ul>
        <li>
          <Link href="/blog/posts/1">Post 1</Link>
        </li>
        <li>
          <Link href="/blog/posts/2">Post 2</Link>
        </li>
        <li>
          <Link href="/blog/posts/3">Post 3</Link>
        </li>
        <li>
          <Link href="/blog/posts/4">Post 4</Link>
        </li>
      </ul>
    </>
  );
}
