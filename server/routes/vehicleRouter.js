import express from "express";
import { addVehicle, getVehicles, getReviews, addBooking, deleteBooking } from "../controllers/controller.js";
import { adminLogin, Login } from "../controllers/authController.js";
import { upload} from "../config/cloudinaryConfig.js"; 

const router = express.Router();


router.post("/vehicles",upload.array("images",5), addVehicle);
router.get("/vehicles", getVehicles); 
router.get("/reviews",getReviews);
router.post("/bookings",addBooking);
router.delete("/bookings",deleteBooking);
router.post("/login",Login);


export default router;
