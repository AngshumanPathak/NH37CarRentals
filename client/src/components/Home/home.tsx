import { useState } from "react"
import { NavBar } from "../shared/navBar"
import { SearchBar } from "../shared/searchBar"
import About from "../shared/About"
import CarCard from "../shared/CarCard"
import Contacts from "../shared/Contacts"



const Home = () => {

  const [isSearching, setIsSearching] = useState(false);
  return (
    <>
      
        
          <div id="home">
          <NavBar/>
        </div>    
        
        <div id="search" className="flex justify-center mt-15 sm:mt-60 p-10">
           <SearchBar onSearch={() => setIsSearching(true)}/>           
        </div>
        {!isSearching ? (
          <>
        <div id="about" className="text-white">
          <About/>                    
        </div>  

        <div id="contacts">
          <Contacts/>
        </div>   
         
        </>
       ):(
        <CarCard/>
       )}
           
    </>
    

  )
}

export default Home
