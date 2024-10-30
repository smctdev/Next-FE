import Link from "next/link";

export default function blog() {
  return (
    <div>
      <h1>Blog page</h1>
      <Link href="/blog/posts">Load all posts</Link>
    </div>
  );
}
