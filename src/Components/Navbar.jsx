import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../context/StudentProvider";
import { useEffect } from "react";
const Navbar = () => {
  const { student, setStudent } = useStudent();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const goToProfile = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };
  const logoutHandler = () => {
    console.log(student)
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem('studentEnrollment')
    window.location.href = "/student-login"; // Redirect to login page

  }
  useEffect(() => {

  }, [student])
  return (
    <div
      className="flex justify-between w-full md:py-4 items-center md:px-8 py-2 px-2"
      style={{
        height: "10vh",
      }}
    >
      <div className="logo hidden md:flex text-2xl ">
        <img
          src="https://synques-dyn-cdn.s3.ap-south-1.amazonaws.com/oriental/images/logo.webp"
          alt=""
        />
      </div>

      <div className="md:hidden ">&#9776;</div>
      <div className="navoptions hidden  md:flex md:gap-20 text-lg text justify-center">
        <a href="job">Jobs</a>
        <a href="application-status">For job seekers</a>
        <a href="recuiter-search">For companies</a>
      </div>
      <div className="flex md:gap-10 gap-4 ">
        <a href="/profile" onClick={goToProfile}>
          <Button
            text="Profile"
            className="w-40 h-10 border border-[#AAB1CE] rounded-xl"
          />
        </a>
        {
          student ? (
            <div onClick={logoutHandler}>
              <Button
                text="Logout"
                className="w-40 h-10 text-white bg-[#2B308B] rounded-xl"
              />
            </div>
          ) : (
            <a href="/student-login">
              <Button
                text="Login"
                className="w-40 h-10 text-white bg-[#2B308B] rounded-xl"
              />
            </a>
          )
        }


      </div>
    </div >
  );
};

export default Navbar;
