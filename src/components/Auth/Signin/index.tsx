import Link from "next/link";
import SigninWithPassword from "../SigninWithPassword";
import { Dispatch, SetStateAction } from "react";

export default function SignInForm({
  buttonClasses,
  buttonForGFT,
  setIsSignUpMode
}: {
  buttonClasses?: string;
  buttonForGFT?: string;
  setIsSignUpMode:React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className="w-full max-w-md bg-white shadow-md rounded-2xl px-8 py-10 
      flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome Back 👋
      </h2>


      {/* Email/Password Form */}
      <div className="w-full">
        <SigninWithPassword buttonClasses={buttonClasses} />
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Don’t have an account?{" "}
          <button
            type="button"
            id="sign-up-btn"
            className="text-backgroundColor font-semibold hover:underline"
            onClick={() => setIsSignUpMode(true)}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
