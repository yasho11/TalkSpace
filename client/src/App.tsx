import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
function App(){
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