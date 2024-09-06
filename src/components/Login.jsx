import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { checkValidateData } from "../utils/validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import Header from "./Header";
import { backgroundImage } from "../constants/constants";
import { auth } from "../utils/firebase";

const Login = () => {
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleQuickLogin = () => {
    navigate("/browse");
  };

  const handleButtonClick = () => {
    //validate the form data
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const message = checkValidateData({
      email: emailValue,
      password: passwordValue,
    });
    setErrorMessage(message);

    // Now we can do signin
    if (message) return;

    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes("Error (auth/invalid-credential)")) {
          setErrorMessage("User not found");
          console.log(errorCode);
        }
      });
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

        {/* Login Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative z-10 bg-black bg-opacity-60 p-10 rounded-lg text-white w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6">Sign In</h2>

          <button
            className="w-1/2 bg-gray-600 p-3 hover:bg-green-500 rounded font-bold mb-4"
            onClick={handleQuickLogin}
          >
            Quick Login
          </button>
          <input
            type="text"
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
            // onChange={(e) => {
            //   setPassword(e.target.value);
            // }}
          />

          <button
            className="w-full bg-red-600 p-3 hover:bg-red-500 rounded font-bold mb-4"
            onClick={handleButtonClick}
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
          <p className="text-red-600 font-bold text-lg mb-4">{errorMessage}</p>
          <Link to="#" className="text-gray-400 hover:underline mb-4">
            Forgot Password?
          </Link>
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
      </div>
    </div>
  );
};

export default Login;
