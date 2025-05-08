import React from "react";
import NewBlog from "../../components/User/Blog/NewBlog";
import RecommendArticles from "../../components/User/Blog/RecommendArticles";
import CategoryArticles from "../../components/User/Blog/CategoryArticles";

const Blog = () => {
  return (
    <div className="bg-onPrimary">
      <NewBlog />
      <CategoryArticles />
      <RecommendArticles />
    </div>
  );
};

export default Blog;
