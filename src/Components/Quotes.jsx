import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "remixicon/fonts/remixicon.css";
import "swiper/css";
import "swiper/css/navigation";
import Feedback from "./Feedback";
import Feature_Calculator from "./Feature_Calculator";
import Button from "./Button";
import Alumini from "./Alumini";

const Quotes = () => {
  const quotes = [
    {
      text: "I can't imagine my day to day without this platform. Life would be a lot more difficult.",
    },
    {
      text: "Half of the offers I give are sourced from Wellfound (AngelList Talent). It's the best product for anyone looking for startup talent.",
    },
    {
      text: "I got my tech job on Wellfound (AngelList Talent) 4 years ago and I'm still happy! Pays well, great culture, and unlimited PTO.",
    },
    {
      text: "This platform has changed my perspective on job searching. Highly recommend it!",
    },
    {
      text: "I appreciate the support and resources available through Wellfound.",
    },
    {
      text: "Networking opportunities provided here are invaluable.",
    },
  ];
  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // Local state to manage button disabled states
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const handleSlideChange = (swiper) => {
    // Disable the previous button if we are at the first slide
    setPrevDisabled(swiper.isBeginning);
    // Disable the next button if we are at the last slide
    setNextDisabled(swiper.isEnd);
  };

  return (
    <>
      <section className="py-8 w-full px-4 md:px-20">
        <div className="flex md:flex-row flex-col  justify-between">
          <div className="flex flex-col ">
            <p className="font-medium">Quotes</p>
            <h2 className="text-3xl font-semibold mb-6 text-center">
              From our users
            </h2>
          </div>
          <div className="relative flex justify-center gap-4">
            <button
              className={`custom-button-prev border border-[#c2bfbf] rounded-xl w-16 h-16 text-2xl hover:bg-gray-200 ${
                prevDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Previous"
              disabled={prevDisabled} // Disable button if prevDisabled is true
              onClick={(e) => {
                if (prevDisabled) e.preventDefault();
              }} // Prevent click if disabled
            >
              <i className="ri-arrow-left-line"></i>
            </button>
            <button
              className={`custom-button-next border border-[#c2bfbf] rounded-xl w-16 h-16 text-2xl hover:bg-gray-200 ${
                nextDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Next"
              disabled={nextDisabled} // Disable button if nextDisabled is true
              onClick={(e) => {
                if (nextDisabled) e.preventDefault();
              }} // Prevent click if disabled
            >
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={3}
          navigation={{
            nextEl: ".custom-button-next",
            prevEl: ".custom-button-prev",
          }}
          onSlideChange={handleSlideChange}
          onInit={(swiper) => handleSlideChange(swiper)}
          className="w-full hidden md:block"
        >
          {quotes.map((quote, index) => (
            <SwiperSlide key={index}>
              <Feedback text={quote.text} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".custom-button-next",
            prevEl: ".custom-button-prev",
          }}
          onSlideChange={handleSlideChange}
          onInit={(swiper) => handleSlideChange(swiper)}
          className="w-full md:hidden"
        >
          {quotes.map((quote, index) => (
            <SwiperSlide key={index}>
              <Feedback text={quote.text} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className=" flex flex-col  gap-10  md:flex-row w-full  py-20  ">
          <Feature_Calculator />
          <Feature_Calculator />
        </div>
        {/* <div className="py-10 flex flex-col items-center rounded-md w-full bg-[#CEDEFF80]">
          <h1 className="font-bold text-center text-4xl mb-12">Our top picks for 2024 are here!</h1>
          <p className="text-center mx-auto max-w-2xl font-normal text-xl">
            We've selected 10 top startups across 10 trending industries to showcase as we close out 2023. We selected these teams based on their potential to not only succeed, but to transform their respective industries.
          </p>
          <div className="flex items-start">
            <Button className="mt-2 bg-[#2B308B] px-5 py-2 text-white text-lg rounded-lg " text="Explore our 10 of 10" />
          </div>
        </div> */}

        <div className="w-full  justify-center">
          <button
            className={`custom-button-prev border border-[#c2bfbf] rounded-xl  w-16 h-16 text-2xl hover:bg-gray-200 ${
              prevDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Previous"
            disabled={prevDisabled} // Disable button if prevDisabled is true
            onClick={(e) => {
              if (prevDisabled) e.preventDefault();
            }} // Prevent click if disabled
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <button
            className={`custom-button-next border border-[#c2bfbf] rounded-xl w-16 h-16 text-2xl hover:bg-gray-200 ${
              nextDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Next"
            disabled={nextDisabled} // Disable button if nextDisabled is true
            onClick={(e) => {
              if (nextDisabled) e.preventDefault();
            }} // Prevent click if disabled
          >
            <i className="ri-arrow-right-line"></i>
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={{
              nextEl: ".custom-button-next",
              prevEl: ".custom-button-prev",
            }}
            onSlideChange={handleSlideChange}
            onInit={(swiper) => handleSlideChange(swiper)}
            className="w-full hidden md:block"
          >
            {quotes.map((quote, index) => (
              <SwiperSlide key={index}>
                <Alumini />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-button-next",
              prevEl: ".custom-button-prev",
            }}
            onSlideChange={handleSlideChange}
            onInit={(swiper) => handleSlideChange(swiper)}
            className="w-full md:hidden"
          >
            {quotes.map((quote, index) => (
              <SwiperSlide key={index}>
                <Alumini />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Quotes;
