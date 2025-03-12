import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import api from "../lib/axios";
import useChatStore from "./chatStore";

// Define the shape of your store's state
interface AuthStore {
  socket: Socket | null;
  authUser: { _id: string } | null;
  onlineUsers: string[] | null;
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
  onlineUsers: null,

  checkAuth: async () => {
    if (localStorage.getItem("token")) {
      return true;
    } else {
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

      // Set authUser after login
      set({ authUser: response.data.user });

      // Connect to the socket after login
      get().connectSocket();

      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Invalid credentials";
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
 
    // Unsubscribe from messages before disconnecting socket
    useChatStore.getState().unsubscribedFromMessages();
 
    get().disconnectSocket();
 
    set({ authUser: null });
 },
 

  connectSocket: () => {
    const { authUser } = get(); // Access the authUser state

    if (authUser && !get().socket) {
      const socket = io(Base_URL, {
        query: {
          userId: authUser._id,
        },
      });
      set({ socket: socket });

      socket.on("getOnlineUsers", (userIds: string[]) => {
        set({ onlineUsers: userIds });
      });

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
