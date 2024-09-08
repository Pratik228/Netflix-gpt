import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import logo from "../assets/logo.webp";
import { NORMAL_IMG, SUPPORTED_LANGUAGES } from "../constants/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = ({ onNavChange }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const isBrowse = location.pathname === "/browse";

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

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
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const navItems = [
    { name: "Home", action: () => onNavChange("home") },
    { name: "TV Shows", action: () => onNavChange("tvShows") },
    { name: "Movies", action: () => onNavChange("movies") },
    { name: "My List", action: () => onNavChange("watchlist") },
    { name: "GPT Search", action: () => onNavChange("GPT"), special: true },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-black bg-opacity-0">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center w-full sm:w-auto">
          {/* Mobile menu button */}
          {isBrowse && (
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden text-white mr-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          )}

          {/* Logo */}
          <img
            src={logo}
            alt="NetflixGPT"
            className="w-24 h-auto mx-auto sm:mx-0"
          />
        </div>

        {isBrowse && (
          <>
            {/* Desktop Navigation */}
            <nav className="hidden sm:block">
              <ul className="flex space-x-4 text-white">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    onClick={item.action}
                    className={`cursor-pointer hover:text-gray-300 ${
                      item.special
                        ? "bg-red-600 px-2 py-1 rounded-md hover:bg-red-700"
                        : ""
                    }`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </nav>

            {/* User section */}
            <div className="flex items-center space-x-4 text-white">
              <select
                className="bg-transparent text-white hidden sm:block"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <span className="cursor-pointer hidden sm:block">
                {user?.displayName}
              </span>
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
                  <span className="ml-2 hidden sm:inline">▼</span>
                </button>
                {showLogout && (
                  <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-xl z-20">
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-2 py-2 text-white hover:bg-gray-800"
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

      {/* Mobile Navigation */}
      {showMobileMenu && isBrowse && (
        <nav className="sm:hidden bg-black bg-opacity-90 text-white">
          <ul className="flex flex-col space-y-2 p-4">
            {navItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  item.action();
                  setShowMobileMenu(false);
                }}
                className="cursor-pointer hover:text-gray-300"
              >
                {item.special ? (
                  <span className="inline-block bg-red-600 px-2 py-1 rounded-md hover:bg-red-700 text-sm">
                    {item.name}
                  </span>
                ) : (
                  item.name
                )}
              </li>
            ))}
            <li>
              <select
                className="bg-transparent text-white w-full"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
