import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkValidateData } from "../utils/validate";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { backgroundImage, avatar } from "../constants/constants";
import { SAMPLE_EMAIL, SAMPLE_PASSWORD } from "../constants/constants";

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogin = location.pathname === "/login" || location.pathname === "/";

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleQuickLogin = () => {
    if (email.current && password.current) {
      email.current.value = SAMPLE_EMAIL;
      password.current.value = SAMPLE_PASSWORD;
    }
  };

  const handleSubmit = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const nameValue = name.current?.value;

    const message = checkValidateData({
      email: emailValue,
      password: passwordValue,
      name: isLogin ? undefined : nameValue,
    });
    setErrorMessage(message);
    if (message) return;

    if (isLogin) {
      // Login logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          if (error.message.includes("auth/invalid-credential")) {
            setErrorMessage("User not found");
          } else {
            setErrorMessage(error.message);
          }
        });
    } else {
      // Signup logic
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: nameValue,
            photoURL: avatar,
          });
        })
        .then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(addUser({ uid, email, displayName, photoURL }));
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {isLogin ? (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative z-10 bg-black bg-opacity-60 p-10 rounded-lg text-white w-full max-w-md"
          >
            <h2 className="text-3xl font-bold mb-6">Sign In</h2>
            <button
              className="w-1/2 bg-gray-600 p-3 hover:bg-green-500 rounded font-bold mb-4"
              onClick={handleQuickLogin}
            >
              Quick Login!!
            </button>
            <input
              type="email"
              ref={email}
              placeholder="Email or Mobile Number"
              className="w-full p-3 mb-4 bg-gray-700 rounded"
              required
            />
            <input
              type="password"
              ref={password}
              placeholder="Password"
              className="w-full p-3 mb-6 bg-gray-700 rounded"
              required
            />
            <button
              className="w-full bg-red-600 p-3 hover:bg-red-500 rounded font-bold mb-4"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="px-3 text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
            <button className="w-full bg-gray-700 p-3 rounded font-bold mb-4">
              Use a sign in code
            </button>
            <p className="text-red-600 font-bold text-lg mb-4">
              {errorMessage}
            </p>
            <a href="#" className="text-gray-400 hover:underline mb-4 block">
              Forgot Password?
            </a>
            <div className="flex items-center mt-6">
              <p className="text-gray-400">New to Netflix GPT? </p>
              <button
                onClick={() => navigate("/signup")}
                className="hover:underline ml-2"
              >
                Sign up now
              </button>
            </div>
          </form>
        ) : (
          <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Unlimited movies, TV
              <br />
              shows and more
            </h1>
            <p className="text-xl mb-4">Ready to watch? Enter your details!!</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4 max-w-md mx-auto"
            >
              <input
                type="text"
                ref={name}
                placeholder="User Full Name"
                className="flex-grow p-3 text-base text-white bg-black bg-opacity-50 border border-gray-600 rounded placeholder-gray-400 focus:outline-none focus:border-white"
                required
              />
              <input
                type="email"
                ref={email}
                placeholder="Email address"
                className="flex-grow p-3 text-base text-white bg-black bg-opacity-50 border border-gray-600 rounded placeholder-gray-400 focus:outline-none focus:border-white"
                required
              />
              <input
                type="password"
                ref={password}
                placeholder="Password"
                className="flex-grow p-3 text-base text-white bg-black bg-opacity-50 border border-gray-600 rounded placeholder-gray-400 focus:outline-none focus:border-white"
                required
              />
              <button
                onClick={handleSubmit}
                className="bg-red-600 hover:bg-red-700 py-3 px-6 rounded text-xl font-semibold"
              >
                Get Started <span className="ml-2">&gt;</span>
              </button>
              <p className="text-red-600 font-bold text-lg mb-2">
                {errorMessage}
              </p>
              <div className="flex items-center my-4">
                <p className="px-2">Already Loving Netflix GPT?? </p>
                <button
                  onClick={() => navigate("/login")}
                  className="hover:underline"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
