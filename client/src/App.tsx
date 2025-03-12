
import { useEffect } from "react";
import {socket, connectSocket, disconnectSocket} from "./lib/socket";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App(){
  
  useEffect(()=>{
    connectSocket();

    socket.on("receive-message", (message)=>{
      console.log("New Message:", message);
    });

    return()=>{
      disconnectSocket();
    }

  },[])
  

  
  
  const Layout =() =>{
    const location = useLocation();

    const noSideBarRoutes = ["/login", "/register"];

    const shouldShowSideBar = !noSideBarRoutes.includes(location.pathname);




    return(
      <div className="MainContainer">
        <div className="sidebar">

        </div>
        <div className="display">
         <Routes>
            <Route path= '/register' element = {<Register/>}/>
            <Route path= '/login' element = {<Login/>}/>
          </Routes>
        </div>
      </div>
    )
  }
return(
  <Router>
    <Layout/>
  </Router>
)
}


export default App;