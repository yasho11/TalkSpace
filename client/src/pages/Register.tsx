import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useauthStore from "../store/authStore"; // Importing from authStore.ts

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profile, setProfile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");

  const navigate = useNavigate();

  const { registerUser } = useauthStore(); // Extract registerUser from the store

  const checkPassword = () => password === repassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkPassword()) {
      console.log("Passwords do not match.");
      return;
    }

    try {
      const response = await registerUser({ name, email, password, profile });
      alert(response.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 to-violet-500 dark:from-violet-900 dark:to-purple-700">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="text-center text-3xl font-semibold text-violet-700 dark:text-violet-300 mb-6">
          <h1>Glad to see you!</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-violet-700 dark:text-violet-300 mb-2">Profile Picture</label>
            <input
              type="file"
              onChange={(e) => e.target.files && setProfile(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-violet-700 dark:text-violet-300 mb-2">User Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-violet-700 dark:text-violet-300 mb-2">User Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-violet-700 dark:text-violet-300 mb-2">User Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-violet-700 dark:text-violet-300 mb-2">Re-enter Password:</label>
            <input
              type="password"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="flex justify-between items-center space-x-4">
            <button type="submit" className="w-full py-2 px-4 bg-violet-700 text-white rounded-lg hover:bg-violet-800">
              Register
            </button>
            <button type="button" onClick={() => navigate("/login")} className="w-full py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
