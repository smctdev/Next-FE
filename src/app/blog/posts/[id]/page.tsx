import Link from "next/link";

export default function postDetails({ params }: { params: { id: string }; }) {
  return (
    <>
      <h1>This is post {params.id} </h1>
      <Link href="/blog/posts">Back</Link>
    </>
  );
}
