import React, { useEffect } from "react";
import NewBlog from "../../components/User/Blog/NewBlog";
import RecommendArticles from "../../components/User/Blog/RecommendArticles";
import IslamCategoryArticles from "../../components/User/Blog/IslamCategoryArticles";
import BisnisEkonomiCategoryArticles from "../../components/User/Blog/BisnisEkonomiCategoryArticles";
import LingkunganCategoryArticles from "../../components/User/Blog/LingkunganCategoryArticles";
import PerdataCategoryArticles from "../../components/User/Blog/PerdataCategoryArticles";
import PidanaCategoryArticles from "../../components/User/Blog/PidanaCategoryArticles";
import Feedback from "../../components/User/Blog/Feedback";

const Blog = () => {

  useEffect(() => {
    const logKunjungan = async () => {
      try {
        await fetch("http://localhost:3000/api/grafik-artikel/log-kunjungan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Gagal mencatat kunjungan:", error);
      }
    };
  
    logKunjungan();
  }, []);
  

  
  return (
    <div className="bg-onPrimary">
      <NewBlog />
      <IslamCategoryArticles />
      <BisnisEkonomiCategoryArticles />
      <LingkunganCategoryArticles />
      <PerdataCategoryArticles />
      <PidanaCategoryArticles />
      {/* <Feedback /> */}
      {/* <RecommendArticles /> */}
    </div>
  );
};

export default Blog;
