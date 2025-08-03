import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?limit=9");
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center gap-6 p-6 px-3">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find a variety of articles on topics such as web
          development, software engineering and programming languages.
        </p>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-teal-500 hover:underline"
        >
          View All post
        </Link>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View All posts
            </Link>
          </div>
        )}
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
    </div>
  );
}
