import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";

import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/languageConfigSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gptSelector = useSelector((a) => a.gpt);

  const callSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch(() => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleGPTSearch = () => {
    dispatch(toggleGptSearchView());
  };
  //const langSelector = useSelector((store) => store.languageConfig);
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  const user = useSelector((store) => store.user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // ...
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        navigate("/");
        dispatch(removeUser());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-40 flex flex-col items-center md:flex-row justify-between">
      {/* <h1 className="text-red-600 font-extrabold text-4xl tracking-widest">
        MOVIEAPP
      </h1> */}

      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-05-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8b1-7864-8e94-75a86b260122/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user && (
        <div className="flex md:pt-8 md:p-2">
          {gptSelector.showGptSearch && (
            <select
              className="bg-blue-700 text-white px-2 py-1"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="px-1 bg-purple-800 mx-4 my-2 text-white cursor-pointer rounded-xl text-md"
            onClick={handleGPTSearch}
          >
            {gptSelector.showGptSearch ? "Home" : "GPT Search"}
          </button>
          <div className="flex flex-col items-center">
            <img className="w-12 h-12 mb-1" src={user?.photoURL} />
            <p className="font-bold text-white">{user?.displayName}</p>
          </div>
          <button
            onClick={callSignOut}
            className="font-bold text-white ml-2 hover:cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
