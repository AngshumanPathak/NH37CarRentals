import { AddForm } from "../shared/AddForm";
import  BookingDashboard  from "../shared/BookingDashboard";
import { Button } from "../ui/button";
import booking from "../../assets/icons/booking.svg";
import add from "../../assets/icons/adding.svg";

const AdminDashboard = () => {

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
    <div>
      <h2 className="text-5xl font-bold mb-10 text-yellow-500 p-10 justify-center">🙋‍♂️Welcome Bishal to your site's dashboard</h2>
      <div id= "bookings" className='p-10'>
      <h1 className="text-3xl font-bold mb-10 text-white">Update your bookings</h1>
      <hr className='text-yellow-300 mb-5'/>
       <BookingDashboard/>
      </div>
      <div id="adding" className='p-10'>
      <h1 className="text-3xl font-bold mb-10 text-white">Add a new vehicle</h1>
      <hr className='text-yellow-300 mb-5'/>
        <AddForm/>
      </div>
      <div className="sm:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-25 bg-gray-700 opacity-90 text-white p-3 rounded-full shadow-lg z-50 w-100">
                <Button className="bg-yellow-500 hover:bg-yellow-600 rounded-full px-4 py-2"><img src={booking} alt="" className="w-10 p-2" onClick={() => handleScroll('bookings')}/></Button>
                <Button className="bg-yellow-500 hover:bg-yellow-600 rounded-full px-4 py-2"><img src={add} alt="" className="w-10 p-2"onClick={() => handleScroll('adding')}/></Button>

      </div>
       
    </div>
  );
};

export default AdminDashboard;