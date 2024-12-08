import React, { useEffect, useState } from "react";
import Frame1 from "../images/Frame.svg";
import Frame2 from "../images/Frame2.svg";
import aptos from "../images/aptos.png";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "../components/ui/reveal-card";
import { ThreeDPhotoCarousel } from "./ui/three-d-carousel";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import CycleText from "./animata/text/cycle-text";

export default function Banner() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after a short delay
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 100);

    // Clean up function
    return () => clearTimeout(timeout);
  }, []);

  const words = "Description for Website";

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-24 w-full">
        <div className="p-24 text-8xl text-white font-bold">
          {/* <TextRevealCard
            text="You know the Song"
            revealText="I know the Artist "
          ></TextRevealCard> */}
          <CycleText /> <span>Your Artist</span>{" "}
        </div>
      </div>
      <div className="w-full  flex flex-col items-center justify-center pt-24">
        <div className="min-h-[500px]  flex flex-col justify-center  space-y-4 absolute">
          <ThreeDPhotoCarousel />
        </div>
      </div>
      <br />
      <div className="flex flex-col items-center justify-center pt-24 w-full">
        {" "}
        <TextGenerateEffect words={words} />
      </div>
    </>

    // <div className="h-screen w-full flex justify-center">
    //   <div className="container pt-24 mt-20 ">
    //     <div
    //       className={`hero-section-group text-white p-5 transition-opacity duration-1000 ${
    //         animate ? "opacity-100" : "opacity-0"
    //       }`}
    //     >
    //       <div className="text-slate-400 text-xs font-thin text-center mb-5 font-Inter tracking-widest uppercase">
    //         stream earn spend
    //       </div>
    //       <h1
    //         className={`text-3xl sm:text-6xl lg:text-8xl grid justify-center font-bold leading-none tracking-wide ${
    //           animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    //         }`}
    //       >
    //         <span className="flex items-center ml-16">
    //           Earn
    //           <img
    //             className="w-8 h-8 sm:w-10 sm:h-14 mt-3"
    //             src={Frame1}
    //             alt="frame1"
    //           />
    //         </span>

    //         <span className="ml-20 flex items-center">
    //           <img
    //             className="w-8 h-8 sm:w-10 sm:h-10 mt-4 mr-2"
    //             src={Frame2}
    //             alt="frame2"
    //           />
    //           Your Artist!
    //         </span>
    //       </h1>
    //       <div
    //         className={`pt-8 text-md md:text-lg text-center text-slate-500 ${
    //           animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    //         }`}
    //       >
    //         Embrace the Future of Digital Collectibles.
    //       </div>
    //     </div>
    //     <div
    //       className={`sponsored-section flex flex-col items-center mt-20 ${
    //         animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    //       }`}
    //     >
    //       <div className="text-slate-500 text-sm">Powered by</div>
    //       <div className="w-32">
    //         <img className="" src={aptos} alt="Sponsored" />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
