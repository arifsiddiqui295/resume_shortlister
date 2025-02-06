import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faFileAlt,
  faHandPointer,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import Line from "./Line";
const Section = ({ className, heading, text1, text2, text3, text4 }) => {
  return (
    <div className={className}>
      <h2 className="text-lg font-medium">Got talent?</h2>
      <h1 className="font-semibold text-4xl">{heading}</h1>
      <div className="flex-col space-y-4 md:justify-centre items-start   gap-4 w-full py-10  md:py-10 ">
        <div className="flex  md:flex-row gap-4 pt-4 items-center ">
          <div className="bg-blue-100 rounded-full p-4">
            <FontAwesomeIcon
              icon={faBriefcase}
              className="text-blue-500 text-xl"
            />
          </div>
          <p>{text1}</p>
        </div>

        <div className="flex  md:flex-row gap-4    items-center ">
          <div className="bg-blue-100 rounded-full p-4">
            <FontAwesomeIcon
              icon={faFileAlt}
              className="text-blue-500 text-xl "
            />
          </div>
          <p>{text2}</p>
        </div>

        <div className="flex md:flex-row  gap-4   items-center ">
          <div className="bg-blue-100 rounded-full p-4">
            <FontAwesomeIcon
              icon={faHandPointer}
              className="text-blue-500 text-xl"
            />
          </div>
          <p>{text3}</p>
        </div>

        <div className="flex  md:flex-row items-center gap-4">
          <div className="bg-blue-100 rounded-full p-4">
            <FontAwesomeIcon icon={faStar} className="text-blue-500 text-xl" />
          </div>
          <p>{text4}</p>
        </div>
      </div>
      <div className="flex gap-5">
        <Button
          text="Learn more"
          className="w-40 h-10  border border-[#AAB1CE] rounded-xl"
        />
        <Button
          text="Sign up"
          className="w-28 h-10 text-white  bg-[#2B308B] rounded-xl"
        />
      </div>
    </div>
  );
};

export default Section;
