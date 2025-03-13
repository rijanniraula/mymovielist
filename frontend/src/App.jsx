import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/AdminPanelSidebar/Sidebar";
import AdminPanelRoutes from "./routes/AdminPanelRoutes";
import HomeRoutes from "./routes/HomeRoutes";

function App(){
  return(
    <Router>
        {/* <Sidebar /> */}
         <AdminPanelRoutes />
         <HomeRoutes />
       
     </Router>
  );
}
export default App