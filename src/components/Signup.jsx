import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
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

      <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Unlimited movies, TV
          <br />
          shows and more
        </h1>
        <p className="text-xl mb-4">Ready to watch? Enter your details!!</p>
        <form className="flex flex-col gap-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="User Full Name"
            className="flex-grow p-3 text-base text-white bg-black bg-opacity-50 border border-gray-600 rounded placeholder-gray-400 focus:outline-none focus:border-white"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email address"
            className="flex-grow p-3 text-base text-white bg-black bg-opacity-50 border border-gray-600 rounded placeholder-gray-400 focus:outline-none focus:border-white"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="flex-grow p-3 text-base text-white bg-black bg-opacity-50 border border-gray-600 rounded placeholder-gray-400 focus:outline-none focus:border-white"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-red-600 hover:bg-red-700 py-3 px-6 rounded text-xl font-semibold">
            Get Started <span className="ml-2">&gt;</span>
          </button>
          <div className="flex items-center my-4">
            <p className="px-2">Already Loving Netflix GPT?? </p>
            <button onClick={() => navigate("/")} className="hover:underline">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
