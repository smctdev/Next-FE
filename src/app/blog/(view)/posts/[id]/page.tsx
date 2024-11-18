"use client";

import { Post } from "@/app/blog/types/PostType";
import LoadingLoaders from "@/app/components/loaders/LoadingLoaders";
import { useAuth } from "@/app/context/AuthContext";
import api from "@/app/lib/axiosCall";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function postDetail() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, loading: authLoading }: any = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      return router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) return <LoadingLoaders />;

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
