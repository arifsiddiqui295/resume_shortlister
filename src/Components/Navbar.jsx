import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../context/StudentProvider";

const Navbar = () => {
  const { student, setStudent } = useStudent();
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle mobile menu
  const handleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Navigate to profile with loading state
  const goToProfile = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  // Logout handler
  const logoutHandler = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("studentEnrollment");
    setStudent(null);
    navigate("/student-login");
  };

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="flex h-[10vh] justify-between w-full md:py-4 items-center md:px-8 py-2 px-2">
      {/* Logo */}
      <div
        onClick={() => {
          navigate('/');
        }}
        className="hidden md:block">
        <img
          src="https://synques-dyn-cdn.s3.ap-south-1.amazonaws.com/oriental/images/logo.webp"
          alt=""
          className="w-full object-contain"
        />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden ml-4 cursor-pointer" onClick={handleMenu}>
        &#9776;
      </div>

      {/* Desktop Navigation Links */}
      <div className="navop hidden md:flex md:gap-20 text-lg justify-center">
        <a href="job">Jobs</a>
        <a href="application-status" className="whitespace-nowrap">
          For Job Seekers
        </a>
        <a href="recuiter-search">For Companies</a>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[10vh] left-0 w-2/4 bg-white shadow-md flex flex-col items-start gap-4 py-4 md:hidden">
          <a
            href="job"
            className="text-lg pl-8 w-full hover:bg-[#2B308B] hover:text-white"
            onClick={closeMenu}
          >
            Jobs
          </a>
          <a
            href="application-status"
            className="pl-8 w-full text-lg hover:bg-[#2B308B] hover:text-white whitespace-nowrap"
            onClick={closeMenu}
          >
            For Job Seekers
          </a>
          <a
            href="recuiter-search"
            className="text-lg pl-8 w-full hover:bg-[#2B308B] hover:text-white"
            onClick={closeMenu}
          >
            For Companies
          </a>
        </div>
      )}

      {/* Profile and Login/Logout Buttons */}
      <div className="flex md:gap-10 gap-4">
        <a href="/profile" onClick={goToProfile}>
          <Button
            text="Profile"
            className="md:w-40 w-16 h-10 font-semibold text-sm md:text-xl border border-[#AAB1CE] rounded-xl"
          />
        </a>

        {student ? (
          <div onClick={logoutHandler}>
            <Button
              text="Logout"
              className="md:w-40 w-16 h-10 font-semibold text-sm md:text-xl text-white bg-[#2B308B] rounded-xl"
            />
          </div>
        ) : (
          <a href="/student-login">
            <Button
              text="Login"
              className="md:w-40 w-16 h-10 font-semibold text-sm md:text-xl text-white bg-[#2B308B] rounded-xl"
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;