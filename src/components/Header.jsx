import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const callSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  const user = useSelector((store) => store.user);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-40 flex justify-between">
      <h1 className="text-red-600 font-extrabold text-4xl tracking-widest">
        MOVIEAPP
      </h1>
      {user && (
        <div className="flex p-2">
          <img className="w-12 h-12" src={user?.photoURL} />
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
