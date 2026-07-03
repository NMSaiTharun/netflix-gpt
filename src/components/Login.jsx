import { useRef, useState } from "react";
import Header from "./Header";
import validateForm from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {
  BACKGROUND_IMG_URL,
  MAIN_LOGO_URL,
  PROFILE_LOGO_URL,
} from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
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
    if (!errorMessage) {
      if (!isSignInForm) {
        createUserWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value,
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
              displayName: nameRef.current.value,
              //update custom image, I am adding smile user icon
              photoURL: PROFILE_LOGO_URL,
            })
              .then(() => {
                // Profile updated!
                // ...
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  }),
                );
              })
              .catch((error) => {
                // An error occurred
                // ...
                setErrorMessage(error.message);
              });

            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
            // ..
          });
      } else {
        signInWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value,
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const { uid, email, displayName, photoURL } = user;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              }),
            );
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
          });
      }
    }
  };

  return (
    <div className="relative h-screen">
      <Header />
      <div className="absolute w-full h-full">
        <img
          className="w-full h-full object-cover"
          src={BACKGROUND_IMG_URL}
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
              ? "New to MovieApp? Sign Up Now"
              : "Already Registered? Sign In Now"}
          </p>
          <p className="text-sm text-white font-bold text-center pt-4 border-t border-gray-600">
            This is a personal learning project and is not affiliated with or
            endorsed by Netflix. Not for production use.
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
