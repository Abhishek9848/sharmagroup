"use client";

import React, { useState } from "react";
import Image from "next/image";
import login from "./signin.svg";
import signup from "./signup.svg";
import SignInForm from "./Signin";
import SignUpForm from "./Signin"; // make sure you have both

const SlidingLoginSignup = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const toggleSignUpMode = () => setIsSignUpMode(!isSignUpMode);

  // Button styles
  const buttonClasses = `
    w-full text-white bg-backgroundColor hover:bg-brightColor focus:ring-4 
    focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm 
    px-5 py-3 text-center transition-all duration-200 transform 
    hover:scale-[1.02] hover:shadow-md
  `;

  const buttonForGFT = `
    inline-flex w-full justify-center items-center rounded-lg border 
    border-gray-300 bg-white py-2.5 px-4 text-sm font-medium text-gray-500 
    hover:bg-gray-50 shadow-sm transition-all duration-200 hover:shadow 
    hover:border-gray-400
  `;

  return (
    <div
      className={`relative w-full bg-white min-h-[100vh] lg:min-h-screen overflow-hidden
        before:content-[''] before:absolute before:w-[2000px] before:h-[2000px] 
        before:rounded-full before:bg-backgroundColor before:top-1/2 before:right-[48%]
        before:-translate-y-1/2 before:transition-all before:duration-[1.8s]
        ${isSignUpMode ? "before:translate-x-full before:right-[52%]" : ""}
      `}
    >
      {/* Sliding forms section */}
      <div className="absolute w-full h-full top-0 left-0">
        <div
          className={` absolute top-[95%] lg:top-1/2 left-1/2 grid grid-cols-1 z-[5] -translate-x-1/2 
             -translate-y-full lg:-translate-y-1/2 lg:w-1/2 w-full  transition-[1s]  duration-[0.8s] 
             lg:duration-[0.7s] ease-[ease-in-out] "  ${
            isSignUpMode
              ? "lg:left-1/4   max-lg:top-[-10%]   max-lg:-translate-x-2/4   max-lg:translate-y-0"
              : "lg:left-3/4 "
          } `}
        >
          {/* Sign In Form */}
          <div
            className={` flex items-center justify-center flex-col   transition-all duration-[0.2s] delay-[0.7s] 
              overflow-hidden col-start-1 col-end-2 row-start-1 row-end-2 px-20 max-lg:mt-60  z-20 max-md:px-6 
              max-md:py-0 ${
              isSignUpMode ? " opacity-0 z-10 " : " "
            }`}
          >
            <SignInForm
              buttonClasses={buttonClasses}
              buttonForGFT={buttonForGFT}
            />
          </div>

          {/* Sign Up Form */}
          <div
            className={`flex items-center justify-center flex-col px-20 transition-all  ease-in-out duration-[0.2s]
               delay-[0.7s] overflow-hidden col-start-1 col-end-2 row-start-1 row-end-2 py-0 z-10 max-md:px-6 
               max-md:py-0 opacity-0 ${
              isSignUpMode ? "opacity-100 z-20 " : "  "
            }`}
          >
            <SignUpForm
              buttonClasses={buttonClasses}
              buttonForGFT={buttonForGFT}
            />
          </div>
        </div>
      </div>

      {/* Panels with text + illustration */}
      <div
        className="absolute h-full w-full top-0 left-0 grid grid-cols-1 lg:grid-cols-2 
        max-lg:grid-rows-[1fr_2fr_1fr]"
      >
        {/* Left Panel — Sign In */}
        <div
          className={`flex flex-row justify-around lg:flex-col items-center text-center 
            z-[6] pl-[12%] pr-[17%] pt-12 pb-8 
            ${isSignUpMode ? "pointer-events-none" : "pointer-events-auto"}
          `}
        >
          <div
            className={`text-white transition-transform duration-[1s] ease-[ease-in-out] 
              delay-[0.4s] ${isSignUpMode ? "lg:-translate-x-[800px]" : ""}
            `}
          >
            <h3 className="font-semibold text-[1.5rem] text-gray-700">
              New here?
            </h3>
            <p className="text-[0.95rem] py-3">
              Sign up and discover our platform
            </p>
            <button
              onClick={toggleSignUpMode}
              className="bg-transparent border-2 border-white rounded-full 
              px-5 py-2 text-gray-700 font-semibold hover:bg-white hover:text-gray-700 
              transition-colors duration-300"
            >
              Sign up
            </button>
          </div>

          <Image
            src={login}
            alt="Login illustration"
            width={400}
            height={400}
            className={`max-md:hidden w-[220px] lg:w-[400px] transition-transform 
              duration-[1s] ease-[ease-in-out] delay-[0.4s]
              ${isSignUpMode ? "lg:-translate-x-[800px]" : ""}
            `}
            priority
          />
        </div>

        {/* Right Panel — Sign Up */}
        <div
          className={`flex flex-row lg:flex-col items-center justify-around text-center 
            z-[6] pl-[17%] pr-[12%] pt-12 pb-8 
            ${isSignUpMode ? "pointer-events-auto" : "pointer-events-none"}
          `}
        >
          <div
            className={`text-white transition-transform duration-[1s] ease-[ease-in-out] 
              delay-[0.4s] ${isSignUpMode ? "" : "lg:translate-x-[800px]"}
            `}
          >
            <h3 className="font-semibold text-[1.5rem] text-gray-700">
              One of us?
            </h3>
            <p className="text-[0.95rem] py-3">
              Sign in to your account for a hassle-free experience
            </p>
            <button
              onClick={toggleSignUpMode}
              className="bg-transparent border-2 border-white rounded-full 
              px-5 py-2 text-gray-700 font-semibold hover:bg-white hover:text-gray-700 
              transition-colors duration-300"
            >
              Sign in
            </button>
          </div>

          <Image
            src={signup}
            alt="Signup illustration"
            width={400}
            height={400}
            className={`max-md:hidden w-[220px] lg:w-[400px] transition-transform 
              duration-[1s] ease-[ease-in-out] delay-[0.4s]
              ${isSignUpMode ? "" : "lg:translate-x-[800px]"}
            `}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SlidingLoginSignup;
