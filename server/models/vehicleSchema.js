import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({ 
    bookedFrom: { type: Date, required: true },
    bookedTill: { type: Date, required: true },
});

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fuelType: { type: String, required: true },
    category: { type: String, required: true },
    seatCapacity: {type: String, required: true},
    image: { type: [], required: true }, // Array of image URLs
    price: { type: Number, required: true },
    bookedFrom: { type: Date, required: true },
    bookedTill: { type: Date, required: true },
    availability: { type: Boolean, default: true },
    bookings: {type: [bookingSchema], default: []},
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
