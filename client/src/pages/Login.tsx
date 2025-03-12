import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useauthStore from "../store/authStore";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { loginUser } = useauthStore();
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });
      console.log(response.message);
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 to-violet-500 dark:from-violet-900 dark:to-purple-700">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-violet-700 dark:text-violet-300">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-violet-500"
              placeholder="Email"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-violet-500"
              placeholder="Password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-violet-700 text-white rounded-lg hover:bg-violet-800 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-full py-2 px-4 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
