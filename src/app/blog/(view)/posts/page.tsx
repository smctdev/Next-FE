"use client";

import { useEffect, useState } from "react";
import { Post } from "../../types/PostType";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import LoadingLoaders from "@/app/components/loaders/LoadingLoaders";
import api from "@/app/lib/axiosCall";
import Link from "next/link";

export default function posts() {
  const [posts, setPosts] = useState<Post[]>([]);
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
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data.posts);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post: any, index: any) => {
          return (
            <ul key={index}>
              <li>
                <Link href={`/blog/posts/${post.id}`}>{post.title}</Link>
              </li>
            </ul>
          );
        })
      )}
    </>
  );
}
