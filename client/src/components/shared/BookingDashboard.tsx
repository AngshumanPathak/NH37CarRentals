import { getVehicles, addBooking, deleteBooking } from "@//lib/apis/apis"
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  
  CardFooter,
  CardHeader,
  
} from "../ui/card";

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"


const BookingDashboard = () => {
  
  interface Booking {
    bookedFrom: string;
    bookedTill: string;
  }

  interface Vehicle {
    _id: string;
    name: string;
    fuelType: string;
    price: number;
    category: string;
    seatCapacity: string;
    bookedFrom: string;
    bookedTo: string;
    image: string;
    availability: string;
    bookings: Booking[];
  }

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dateFrom, setDateFrom] = useState<Date>()
    const [dateTo, setDateTo] = useState<Date>()
    const [selectedDates, setSelectedDates] = useState<{ 
      [key: string]: { dateFrom?: Date; dateTo?: Date } 
    }>({});


    const handleDateChange = (vehicleId: string, field: "dateFrom" | "dateTo", value: Date | undefined) => {
      setSelectedDates((prev) => ({
        ...prev,
        [vehicleId]: {
          ...prev[vehicleId], // Keep existing dates
          [field]: value, // Update only the changed field
        }
      }));
    };


    const handleAddBooking = async (vehicleId: string, dateFrom?: Date, dateTo?: Date) => {
      if (!dateFrom || !dateTo) {
        alert("Please select both dates");
        return;
      }
    
      try {
        await addBooking({
          vehicleId,
          bookedFrom: dateFrom.toISOString(),
          bookedTill: dateTo.toISOString(),
        });
    
        setVehicles((prevVehicles) =>
          prevVehicles.map((vehicle) =>
            vehicle._id === vehicleId
              ? {
                  ...vehicle,
                  bookings: [...vehicle.bookings, { bookedFrom: dateFrom.toISOString(), bookedTill: dateTo.toISOString() }]
                }
              : vehicle
          )
        );
    
        alert("Booking added successfully");
      } catch (error) {
        console.error('Error adding booking:', error);
        alert("Failed to add booking");
      }
    };
    
    const handleDeleteBooking = async (vehicleId: string, dateFrom?: Date, dateTo?: Date) => {
      if (!dateFrom || !dateTo) {
        alert("Please select both dates");
        return;
      }
    
      try {
        await deleteBooking({
          vehicleId,
          bookedFrom: dateFrom.toISOString(),
          bookedTill: dateTo.toISOString(),
        });
    
        alert("Booking deleted successfully");
        setVehicles((prevVehicles) =>
          prevVehicles.map((vehicle) =>
            vehicle._id === vehicleId
              ? { ...vehicle, bookings: [], bookedFrom: "", bookedTo: "", availability: "available" }
              : vehicle
          )
        );
      } catch (error) {
        alert("Failed to delete booking");
        console.error(error);
      }
    };
    

    useEffect(() => {
      const fetchVehicles = async () => {
        try {
          const data = await getVehicles();
    
          // Ensure data is an array
          if (Array.isArray(data)) {
            setVehicles(data);
          } else {
            console.error("Unexpected API response:", data);
            setError("Invalid data format");
            setVehicles([]); // Ensure vehicles is always an array
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setError("Failed to fetch vehicles");
          setVehicles([]); // Prevent errors in rendering
        } finally {
          setLoading(false);
        }
      };
    
      fetchVehicles();
    }, []);

  return (
     
    
    <>
        <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Booking Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => {
          // Get dates for this specific vehicle
          const vehicleDates = selectedDates[vehicle._id] || {};

          return (
          <Card key={vehicle._id} className="shadow-lg border border-gray-300 bg-yellow p-4">
            <CardHeader className="flex items-center space-x-4">
              <img src={vehicle.image} alt={vehicle.name} className="w-20 h-20 rounded-md object-cover" />
              <div>
                <h2 className="text-lg font-semibold">{vehicle.name}</h2>
                <p className="text-sm text-white">{vehicle.category} • {vehicle.fuelType}</p>
              </div>
            </CardHeader>

            <CardContent className="mt-2">
              <p className="text-white mt-2"><strong>Seat Capacity:</strong> {vehicle.seatCapacity}</p>
              <p className="text-white mt-2"><strong>Price:</strong> ₹{vehicle.price}/day</p>
              <p className={`text-sm font-semibold mt-2 ${vehicle.bookedFrom && vehicle.bookedTo ? "text-red-500" : "text-green-500"}`}>
                {vehicle.bookedFrom && vehicle.bookedTo 
                  ? `Unavailable from ${vehicle.bookedFrom} to ${vehicle.bookedTo}` 
                  : "Available"}
              </p>

              <p>
             <Popover>
             <PopoverTrigger asChild>
             <Button
                variant={"outline"}
                className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateFrom && "text-muted-foreground rounded-md mt-2"
                 )}
              >
             <CalendarIcon />
             {vehicleDates.dateFrom ? format(vehicleDates.dateFrom, "PPP") : (<span>Pick a date</span>)}
             </Button>
             </PopoverTrigger>
             <PopoverContent className="w-auto p-0" align="start">
                 <Calendar
                  mode="single"
                  selected={vehicleDates.dateFrom}
                  onSelect={(date) => handleDateChange(vehicle._id, "dateFrom", date)}
                  initialFocus
                  />
               </PopoverContent>
               </Popover>
              </p>
                 

              <p>
              <Popover>
             <PopoverTrigger asChild>
             <Button
                variant={"outline"}
                className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateTo && "text-muted-foreground rounded-md mt-2"
                 )}
              >
             <CalendarIcon />
             {vehicleDates.dateTo ? format(vehicleDates.dateTo, "PPP") : (<span>Pick a date</span>)}
             </Button>
             </PopoverTrigger>
             <PopoverContent className="w-auto p-0" align="start">
                 <Calendar
                  mode="single"
                  selected={vehicleDates.dateTo}
                  onSelect={(date) => handleDateChange(vehicle._id, "dateTo", date)}
                  initialFocus
                  />
               </PopoverContent>
               </Popover>
                  
              </p>
            </CardContent>

            <CardFooter className="mt-4 flex justify-between">

             <Button 
             onClick={()=>handleAddBooking(vehicle._id, vehicleDates.dateFrom, vehicleDates.dateTo)}
             className="bg-green-400 rounded-md">Add</Button>
             <Button onClick={()=>handleDeleteBooking(vehicle._id, vehicleDates.dateFrom, vehicleDates.dateTo)}className="bg-red-400 rounded-md">Delete</Button>
            </CardFooter>
          </Card>
        );
        })}
      </div>
    </div>
    </>
  )
}

export default BookingDashboard;
