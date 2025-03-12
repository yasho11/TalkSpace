import { useChatStore } from "../store/chatStore";
import SideBar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";  // Assuming you have this component
import ChatContainer from "../components/ChatContainer";  // Assuming you have this component

const Homepage = () => {
  // Destructure selectedUser from the store
  const { selectedUsers } = useChatStore(); 

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl q-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideBar />
            {/* Render ChatContainer if selectedUser exists, else render NoChatSelected */}
            {!selectedUsers ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Homepage;
