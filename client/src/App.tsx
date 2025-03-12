
import { Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
function App(){
  
  
return(
  
  <div>

  <NavBar/>

  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path = "/login" element={<Login/>}/>
    <Route path = "/signup" element={<Register/>}/>
    <Route path = "/home" element={<Homepage/>}/>
    <Route path = "/setting" element={<SettingsPage/>}/>
    <Route path = "/profile" element={<ProfilePage/>}/>
  </Routes>

  </div>
  
  

)

}
export default App;