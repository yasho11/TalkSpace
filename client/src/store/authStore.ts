import api from "../lib/axios";
import { create } from "zustand";
import { io, Socket } from "socket.io-client";

// Define the shape of your store's state
interface AuthStore {
  socket: Socket | null;
  authUser: boolean | null;
  checkAuth: () => Promise<boolean>;
  registerUser: (data: RegisterData) => Promise<any>;
  loginUser: (data: LoginData) => Promise<any>;
  logout: () => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  profile?: File | null;
}

interface LoginData {
  email: string;
  password: string;
}

const Base_URL = "http://localhost:1256";

// Create the Zustand store with the correct types
const useauthStore = create<AuthStore>((set, get) => ({
  socket: null,
  authUser: null,

  checkAuth: async () => {
    if (localStorage.getItem("token")) {
      set({ authUser: true });
      return true;
    } else {
      set({ authUser: false });
      return false;
    }
  },

  registerUser: async ({ name, email, password, profile }: RegisterData) => {
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
      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Something went wrong";
    }
  },

  loginUser: async ({ email, password }: LoginData) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // After successful login, check if user is authenticated
      set({ authUser: true });

      // Connect to the socket after login
      get().connectSocket();

      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Invalid credentials";
    }
  },

  logout: async () => {
    localStorage.removeItem("token");

    // Call disconnectSocket to ensure socket is disconnected
    get().disconnectSocket();

    // Set authUser to null after logout
    set({ authUser: null });
  },

  connectSocket: () => {
    const { authUser } = get(); // Access the authUser state

    if (authUser || get().socket?.connected) {
      const socket = io(Base_URL);
      set({ socket });
      socket.connect();
    }
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

export default useauthStore;
