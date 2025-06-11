import React from "react";
import Hero from "../../components/User/Home/Hero";
import Features from "../../components/User/Home/Features";
import Tagline from "../../components/User/Home/Tagline";
import Short_heading from "../../components/User/Home/Short_heading";
import Home_News from "../../components/User/Home/Home_News";
import Home_AboutUs from "../../components/User/Home/Home_AboutUs";
import Home_FAQ from "../../components/User/Home/Home_FAQ";
import FeedbackSlider from "../../components/User/Home/FeedbackSlider";
import LawyerPromo from "../../components/User/Home/LawyerPromo";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Tagline />
      <LawyerPromo />
      <Features />
      <Short_heading />
      <Home_News />
      <Home_AboutUs />
      <Home_FAQ />
      <FeedbackSlider />
    </div>
  );
};

export default Home;
