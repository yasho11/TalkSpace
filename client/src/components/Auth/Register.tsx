import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios/axios";

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profile, setProfile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");

  const navigate = useNavigate();

  // Function to check if passwords match
  const checkPassword = () => {
    return password === repassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkPassword()) {
      console.log("Passwords do not match. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (profile) {
      formData.append("profile", profile);
    }

    try {
      const response = await api.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      navigate("/login");
    } catch (err: any) {
      console.error(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 to-violet-500 dark:from-violet-900 dark:to-purple-700">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="text-center text-3xl font-semibold text-violet-700 dark:text-violet-300 mb-6">
          <h1>Glad to see you!</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Input */}
          <div>
            <label className="block text-lg font-medium text-violet-700 dark:text-violet-300 mb-2">Profile Picture</label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProfile(e.target.files[0]);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-violet-700 dark:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
            />
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-lg font-medium text-violet-700 dark:text-violet-300 mb-2">User Name:</label>
            <input
              type="text"
              value={name}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-violet-700 dark:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-lg font-medium text-violet-700 dark:text-violet-300 mb-2">User Email:</label>
            <input
              type="email"
              value={email}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-violet-700 dark:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-lg font-medium text-violet-700 dark:text-violet-300 mb-2">User Password:</label>
            <input
              type="password"
              value={password}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-violet-700 dark:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Re-enter Password Input */}
          <div>
            <label className="block text-lg font-medium text-violet-700 dark:text-violet-300 mb-2">Re-enter Password:</label>
            <input
              type="password"
              value={repassword}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-violet-700 dark:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
              onChange={(e) => setRepassword(e.target.value)}
              required
            />
          </div>

          {/* Submit & Login Buttons */}
          <div className="flex justify-between items-center space-x-4">
            <button type="submit" className="w-full py-2 px-4 bg-violet-700 dark:bg-violet-600 text-white rounded-lg hover:bg-violet-800 dark:hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400">
              Register
            </button>
            <button type="button" onClick={() => navigate("/login")} className="w-full py-2 px-4 bg-gray-300 dark:bg-gray-600 text-violet-700 dark:text-violet-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
