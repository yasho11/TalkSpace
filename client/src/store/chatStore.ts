import { create } from "zustand";
import toast from "react-hot-toast";
import api from "../lib/axios";
import useauthStore from "./authStore";

export interface ChatStoreState {
  messages: any[];
  users: any[];
  selectedUsers: any | null;
  isUsersLoading: boolean;
  isMessageLoading: boolean;
  unsubscribeFromMessages: any;
  setSelectedUser: any;
}

interface ChatStoreActions {
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
}

export const useChatStore = create<ChatStoreState & ChatStoreActions>(
  (set, get) => ({
    messages: [],
    users: [], // Ensure this is initialized as an array
    selectedUsers: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
      set({ isUsersLoading: true });

      try {
        const res = await api.get("/messages/getusers");
        console.log("Users API Response:", res.data); // Debugging log

        if (Array.isArray(res.data.users)) {
          set({ users: res.data.users }); // ✅ Extract 'users' array properly
        } else {
          console.error("API did not return an array:", res.data);
          set({ users: [] }); // Fallback to empty array
        }
      } catch (error: any) {
        console.error("Error fetching users:", error);
        toast.error(error.response?.data?.message || "Failed to fetch users");
        set({ users: [] });
      } finally {
        set({ isUsersLoading: false });
      }
    },

    getMessages: async (userId: string) => {
      set({ isMessageLoading: true });
      try {
        const res = await api.get(`/get/${userId}`);
        set({ messages: res.data });
      } catch (error: any) {
        toast.error(error.res.data.message);
      } finally {
        set({ isMessageLoading: false });
      }
    },
    subscribetoMessages: () => {
      const { selectedUsers } = get();
      if (!selectedUsers) return;

      const socket = useauthStore.getState().socket;

      socket?.on("newMessage", (newMessage) => {
        set({
          messages: [...get().messages, newMessage],
        });
      });
    },
    unsubscribeFromMessages: () => {
      const socket = useauthStore.getState().socket;
      socket?.off("newMessage");
    },

    setSelectedUser: (selectedUsers: any) => set({ selectedUsers }),
  })
);

export default useChatStore;
