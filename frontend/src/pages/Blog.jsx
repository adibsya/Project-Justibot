import React from "react";
import NewBlog from "../components/Blog/NewBlog";
import RecommendArticles from "../components/Blog/RecommendArticles";

const Blog = () => {
  return (
    <div className="bg-onPrimary">
      <NewBlog />
      <RecommendArticles />
    </div>
  );
};

export default Blog;
