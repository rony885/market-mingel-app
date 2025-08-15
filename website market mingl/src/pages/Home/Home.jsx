import React from "react";
import HeroSection from "./HeroSection";
import Fostering from "./Fostering";
import Connecting from "./Connecting";
import ManagingDirector from "./ManagingDirector";
import Associates from "./Associates";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Fostering />
      <Connecting />
      <ManagingDirector />
      <Associates />
    </>
  );
};

export default Home;
