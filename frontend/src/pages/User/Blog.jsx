import React from "react";
import NewBlog from "../../components/User/Blog/NewBlog";
import RecommendArticles from "../../components/User/Blog/RecommendArticles";

const Blog = () => {
  return (
    <div className="bg-onPrimary">
      <NewBlog />
      <RecommendArticles />
    </div>
  );
};

export default Blog;
