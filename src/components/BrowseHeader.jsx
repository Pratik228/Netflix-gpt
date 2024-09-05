// BrowseHeader.js
import { useState, useEffect } from "react";
import logo from "../assets/logo.webp";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { NORMAL_IMG } from "../constants/constants";

const BrowseHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleToggleLogout = () => {
    setShowLogout(!showLogout);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log("Error Signing out the user!!", error);
        navigate("/error");
      });
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "bg-black" : "bg-gradient-to-b from-black"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <img src={logo} alt="Netflix" className="w-24 h-auto" />
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
          <span className="cursor-pointer">{user.displayName}</span>
          <div className="relative">
            <button onClick={handleToggleLogout} className="flex items-center">
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
      </div>
    </header>
  );
};

export default BrowseHeader;
