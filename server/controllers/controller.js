import Vehicle from "../models/vehicleSchema.js";
import dotenv from 'dotenv'
import axios from 'axios'







export const addVehicle = async (req, res) => {
    try {
        const imageUrls = req.files.map(file => file.path); // Extract image URLs from Cloudinary

        const newVehicle = new Vehicle({ ...req.body, image: imageUrls });
        await newVehicle.save();

        res.status(201).json({ message: "Vehicle added successfully", data: newVehicle });
    } catch (error) {
        res.status(500).json({ message: "Error adding vehicle", error });
    }
};


export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vehicles", error });
    }
};


export const getReviews = async (req,res) => {

    dotenv.config();

    try{
         const PLACE_ID = process.env.GOOGLE_MAPS_PLACES_ID;
         const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
         console.log(PLACE_ID);

         const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJbfiE5F5fWjcRwh_QLBrMfZw&fields=reviews&key=${API_KEY}`;

         const response = await axios.get(url);
         console.log(response.data);
         res.json(response.data.result.reviews);
    }
    catch(error){

        console.error("Error fetching Google Reviews:", error);
        res.status(500).json({ message: "Error fetching reviews" });

    }
}


export const addBooking = async (req, res) => {
    try {
        const { vehicleId, bookedFrom, bookedTill } = req.body;

        if (!vehicleId || !bookedFrom || !bookedTill) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newFrom = new Date(bookedFrom);
        const newTo = new Date(bookedTill);

        // Find the vehicle and check if any bookings overlap
        const vehicle = await Vehicle.findOne({
            _id: vehicleId,
            bookings: {
                $elemMatch: {
                    bookedFrom: { $lte: newTo },
                    bookedTill: { $gte: newFrom }
                }
            }
        });

        if (vehicle) {
            return res.status(400).json({ message: "Vehicle is already booked for these dates" });
        }

        // Add the new booking to the vehicle
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            vehicleId,
            { $push: { bookings: { bookedFrom: newFrom, bookedTill: newTo } } },
            { new: true }
        );

        res.status(201).json({ message: "Booking added successfully", data: updatedVehicle });
    } catch (error) {
        res.status(500).json({ message: "Error adding booking", error });
    }
};


export const deleteBooking = async (req, res) => {
    try {
        const { vehicleId, bookedFrom, bookedTill } = req.body;

        // Find the vehicle
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        // Remove the booking that matches the given dates
        vehicle.bookings = vehicle.bookings.filter(
            booking => booking.bookedFrom.toISOString() !== new Date(bookedFrom).toISOString() ||
                       booking.bookedTill.toISOString() !== new Date(bookedTill).toISOString()
        );

        // Save the updated vehicle
        await vehicle.save();

        res.status(200).json({ message: "Booking deleted successfully", data: vehicle });

    } catch (error) {
        res.status(500).json({ message: "Error deleting booking", error });
    }
};