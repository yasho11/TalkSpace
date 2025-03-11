import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios/axios";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("jwt", response.data.token);
      } else {
        console.log("Login failed");
      }

      console.log(response.data);
    } catch (error: any) {
      console.error(error.response?.data || "Something went wrong");
    }
  };

  const gotoRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 to-violet-500 dark:from-violet-900 dark:to-purple-700">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-violet-700 dark:text-violet-300 text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-lg font-medium text-violet-700 dark:text-violet-300 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-violet-700 dark:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-lg font-medium text-violet-700 dark:text-violet-300 mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-violet-700 dark:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-violet-700 dark:bg-violet-600 text-white rounded-lg hover:bg-violet-800 dark:hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            Log In
          </button>

          {/* Register Button */}
          <button
            type="button"
            onClick={gotoRegister}
            className="w-full py-2 px-4 bg-gray-300 dark:bg-gray-600 text-violet-700 dark:text-violet-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
