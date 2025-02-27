import { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import { getVehicles } from "@//lib/apis/apis";
import whatsApp from '../../assets/icons/whatsApp.svg'
import { RootState } from "@//redux/store";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar"


interface Booking {
  bookedFrom: string;
  bookedTo: string;
  vehicleId: string;
}

interface Vehicle {
  name: string;
  fuelType: string;
  price: number;
  category: string;
  seatCapacity: string;
  bookedFrom: string;
  bookedTo: string;
  image: string;
  bookings: Booking[];
}

const CarCard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("SUV");
  const {dateFrom, dateTo, category} = useSelector((state: RootState) => state.search);
  const [selectedTab, setSelectedTab] = useState<string>("All");

  const phoneNumber = "7002272388";

  const handleBookNow = (vehicle: Vehicle) => {
    const message = `Hello! I'm interested in booking the following car:
    🚗 *Car Name:* ${vehicle.name}
    🔹 *Type:* ${vehicle.fuelType}
    💰 *Price:* ₹${vehicle.price}/day`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        setError("Failed to fetch vehicles");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const isAvailable = (vehicle: Vehicle) => {
    if (!dateFrom || !dateTo) return true; // If no dates are selected, show all cars

    // Check if any booking conflicts with the selected date range
    return !vehicle.bookings.some((booking) => {
      return (
        (dateFrom <= booking.bookedTo && dateTo >= booking.bookedFrom) // Overlapping bookings
      );
    });
  };


  const filteredVehicles = vehicles.filter((vehicle) => {
    const isCarAvailable = isAvailable(vehicle);
    
    const matchesCategory =
      (selectedTab === "All" || vehicle.category === selectedTab) &&
      (!category || vehicle.seatCapacity === category);

    return isCarAvailable && matchesCategory;
  });
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Filtered vehicles based on the selected category
  
  return (
     
      
    <div className="text-white p-10">
      <h1 className="text-4xl font-bold mb-10">Fleet of Cars</h1>
      <hr className='text-yellow-300 mb-5'/>

      {/* Top Navigation */}
      <div className="flex justify-center space-x-5 mb-8">
        {["SUV", "Sedan", "Hatchback"].map((tab) => (
          <Button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-md ${
              selectedTab === tab ? "bg-yellow-500" : "bg-gray-700"
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Grid Layout for Cars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle, index) => (
            <Card key={index} className="text-white bg-gradient-to-r from-neutral-900 to-yellow-500 p-4 ">
              <CardHeader>
                <CardTitle>{vehicle.name}</CardTitle>
                <CardDescription>{vehicle.fuelType}</CardDescription>
              </CardHeader>
              <CardContent>
                <img className="rounded-md p-2 h-40 w-full object-cover" src={vehicle.image} alt="car" />
              </CardContent>
              <CardContent className="text-green-300">
              ₹ {vehicle.price}/day
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p>{vehicle.seatCapacity}</p>
                <Button className="rounded-md"onClick={() => handleBookNow(vehicle)}><img src={whatsApp} className="w-5 h-5"/>Book Now</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No {selectedCategory} available</p>
        )}
      </div>
    </div>
  );
};

export default CarCard;
