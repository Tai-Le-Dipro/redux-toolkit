import React from "react";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";

export default function Blog() {
  return (
    <div className="p-5">
      <CreatePost />
      <PostList />
    </div>
  );
}
