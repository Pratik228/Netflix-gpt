import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {};

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="https://staticg.sportskeeda.com/editor/2024/08/907c1-17231340015999-1920.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Login Form */}
      <form className="relative z-10 bg-black bg-opacity-60 p-10 rounded-lg text-white w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6">Sign In</h2>
        <input
          type="text"
          placeholder="Email or Mobile Number"
          className="w-full p-3 mb-4 bg-gray-700 rounded"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-gray-700 rounded"
          value={password}
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="w-full bg-red-600 p-3 hover:bg-red-500 rounded font-bold mb-4"
          onSubmit={handleSubmit}
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
        <Link to="#" className="text-gray-400 hover:underline mb-4">
          Forgot Password?
        </Link>
        <div className="flex items-center my-4">
          <p className="px-2">New to Netflix GPT? </p>
          <button
            onClick={() => navigate("/signup")}
            className="hover:underline"
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
