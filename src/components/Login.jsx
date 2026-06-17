import { useRef, useState } from "react";
import Header from "./Header";
import validateForm from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const errorMessage = validateForm(
      isSignInForm ? "" : nameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value,
      !isSignInForm,
    );
    setErrorMessage(errorMessage);
  };

  return (
    <div className="relative h-screen">
      <Header />
      <div className="absolute w-full h-full">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8027eb3f-343a-499d-9892-e683c12e3cb1/web/IE-en-20260608-TRIFECTA-perspective_8be89c0e-d22e-485b-ac7b-0e15972cbea6_large.jpg"
          alt="logo"
        />
      </div>
      <div className="absolute w-full h-full flex justify-center items-center">
        <form
          className="w-full sm:w-8/12 md:w-5/12 lg:w-3/12 p-12 bg-black text-white opacity-90 rounded-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              ref={nameRef}
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700"
            />
          )}
          <input
            type="text"
            ref={emailRef}
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <p className=" font-bold text-red-700 text-lg py-2">{errorMessage}</p>
          <button
            className="p-4 my-4 cursor-pointer bg-red-700 w-full rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already Registered? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
