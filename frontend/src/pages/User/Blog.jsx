import React from "react";
import NewBlog from "../../components/User/Blog/NewBlog";
import RecommendArticles from "../../components/User/Blog/RecommendArticles";
import IlmiahCategoryArticles from "../../components/User/Blog/IlmiahCategoryArticles";
import EdukasiCategoryArticles from "../../components/User/Blog/EdukasiCategoryArticles";
import OpiniCategoryArticles from "../../components/User/Blog/OpiniCategoryArticles";
import Feedback from "../../components/User/Blog/Feedback";

const Blog = () => {
  return (
    <div className="bg-onPrimary">
      <NewBlog />
      <IlmiahCategoryArticles />
      <EdukasiCategoryArticles />
      <OpiniCategoryArticles />
      <Feedback />
      {/* <RecommendArticles /> */}
    </div>
  );
};

export default Blog;
