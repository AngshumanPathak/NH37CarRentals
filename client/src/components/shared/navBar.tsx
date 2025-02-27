import { Button } from "../ui/button"
import MainLogo from "../../assets/images/MainLogo.png"
import Porche from "../../assets/images/Porche.png"
import home from "../../assets/icons/home.svg"
import about from "../../assets/icons/about.svg"
import services from "../../assets/icons/car.svg"
import contact from "../../assets/icons/contacts.svg"
import {useNavigate} from "react-router-dom"
import { useState } from "react";

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded admin credentials
  const ADMIN_EMAIL = "bishalboro268@gmail.com";
  const ADMIN_PASSWORD = "carRentals##NH37@123";

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsOpen(false);
      navigate("/admin-dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        else{
            console.warn(`Element with id '${id}' not found`);
        }
      };


    
    return (
        <div className="relative bg-gradient-to-b from-yellow-500 to-black-300 h-70 w-vw flex flex-col items-center rounded-b-[70%]">
            <div className="flex justify-between items-center p-4 w-full max-w-6xl">
                <div className="z-10">
                    <img src={MainLogo} alt="Main Logo" className="h-auto w-auto"/>
                </div>
                <div className="sm:flex space-x-4 z-10">
                <Button className="rounded-full bg-white text-black" onClick={() => setIsOpen(true)}>Admin Login</Button>



               
                </div>

                {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-yellow-500 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Admin Login</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

                <div className="sm:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 bg-black/80 text-white p-3 rounded-full shadow-lg z-50 w-100">
                <Button className="bg-yellow-500 hover:bg-yellow-600 rounded-full px-4 py-2"><img src={home} alt="" className="w-10 p-2" onClick={() => handleScroll('home')}/></Button>
                <Button className="bg-yellow-500 hover:bg-yellow-600 rounded-full px-4 py-2"><img src={about} alt="" className="w-10 p-2"onClick={() => handleScroll('about')}/></Button>
                <Button className="bg-yellow-500 hover:bg-yellow-600 rounded-full px-4 py-2"><img src={services} alt="" className="w-10 p-2"onClick={() => handleScroll('search')}/></Button>
                <Button className="bg-yellow-500 hover:bg-yellow-600 rounded-full px-4 py-2"><img src={contact} alt="" className="w-10 p-2"onClick={() => handleScroll('contacts')}/></Button>
                </div>


            </div>
            <div className="flex flex-col text-center px-4 -mt-6 sm:-mt-0 z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight ">
                    Make Trips<span className="text-yellow-300"> Make Memories</span>
                    <span className="inline-flex">
                        <span className="animate-pulse opacity-100 delay-0">.</span>
                        <span className="animate-pulse opacity-75 delay-150">.</span>
                        <span className="animate-pulse opacity-50 delay-300">.</span>
                    </span>
                </h1>
                <div className=" w-full max-w-4xl -mt-10 sm:-mt-40">
                    <img src={Porche} alt="Porche" className="w-full h-auto "/>
                </div>
                
            </div>
        </div>
    )
}