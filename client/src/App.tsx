
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import Home from './components/Home/home'
import AdminDashboard from "./components/Home/AdminDashboard";

function App() {
 

  return (
    <>
      <Router>
        <Routes>
           <Route path="/" element = {<Home/>}/>
           <Route path="/admin-dashboard" element = {<AdminDashboard/>}/>
           
        </Routes>          
      </Router>
        
      
    </>
  )
}

export default App
