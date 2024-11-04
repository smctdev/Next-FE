"use client";

import { Post } from "@/app/types/post";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/utils/axiosCall";

export default function postDetail() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${params.id}`);

        setPost(response.data.post);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  return (
    <>
      <h1>This is post {loading ? "loading..." : post?.title}</h1>
      <Link href="/blog/posts">Back</Link>
    </>
  );
}
