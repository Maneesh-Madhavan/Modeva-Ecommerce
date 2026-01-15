import React, { useState } from "react";
import { assets } from "../assets/assets";
import Spinner from "./Spinner";

const Hero = ({ scrollToLatest, scrollToBestSeller }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Spinner fullPage />}

      <div
        className={`flex flex-col sm:flex-row border border-gray-400 ${
          !loaded ? "hidden" : ""
        }`}
      >
        <img
          className="w-full sm:w-1/2 object-cover cursor-pointer"
          src={assets.hero_img2}
          alt="Hero Left"
          onClick={scrollToBestSeller}
          onLoad={() => setLoaded(true)}
        />

        <img
          className="w-full sm:w-1/2 object-cover cursor-pointer"
          src={assets.hero_img}
          alt="Hero Right"
          onClick={scrollToLatest}
        />
      </div>
    </>
  );
};

export default Hero;
