import React from "react";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Tagline from "../components/Home/Tagline";
import Short_heading from "../components/Home/Short_heading";
import Home_News from "../components/Home/Home_News";
import Home_AboutUs from "../components/Home/Home_AboutUs";
import Home_FAQ from "../components/Home/Home_FAQ";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Tagline />
      <Features />
      <Short_heading />
      <Home_News />
      <Home_AboutUs />
      <Home_FAQ />
    </div>
  );
};

export default Home;
