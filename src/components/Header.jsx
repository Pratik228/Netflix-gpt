import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import logo from "../assets/logo.webp";
import { NORMAL_IMG } from "../constants/constants";

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const isBrowse = location.pathname === "/browse";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        if (!isBrowse) navigate("/browse");
      } else {
        dispatch(removeUser());
        if (isBrowse) navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate, isBrowse]);

  const handleToggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        console.log("Error Signing out the user!!", error);
        navigate("/error");
      });
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full ${
        isBrowse ? "bg-gradient-to-b from-black" : ""
      }`}
    >
      <div className="flex items-center justify-between px-4 ">
        <img src={logo} alt="Netflix" className="w-32 h-auto" />
        {isBrowse && (
          <>
            <nav>
              <ul className="flex space-x-4 text-white">
                <li className="cursor-pointer hover:text-gray-300">Home</li>
                <li className="cursor-pointer hover:text-gray-300">TV Shows</li>
                <li className="cursor-pointer hover:text-gray-300">Movies</li>
                <li className="cursor-pointer hover:text-gray-300">
                  New & Popular
                </li>
                <li className="cursor-pointer hover:text-gray-300">My List</li>
                <li className="cursor-pointer hover:text-gray-300">
                  Browse by Languages
                </li>
              </ul>
            </nav>
            <div className="flex items-center space-x-4 text-white">
              <span className="cursor-pointer">{user?.displayName}</span>
              <div className="relative">
                <button
                  onClick={handleToggleLogout}
                  className="flex items-center"
                >
                  <img
                    src={user?.photoURL || NORMAL_IMG}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="ml-2">▼</span>
                </button>
                {showLogout && (
                  <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-xl z-20">
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-2 py-2 text-white bg-gray-400 hover:bg-red-800"
                    >
                      Sign out of NetflixGPT
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
