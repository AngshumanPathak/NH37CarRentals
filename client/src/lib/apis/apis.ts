



const API_URL = "http://localhost:8000/api";

export const addVehicle = async (vehicleData: any) => {
    try {
        const formData = new FormData();

        // Append all fields except images
        Object.entries(vehicleData).forEach(([key, value]) => {
            if (key !== "image") {
                formData.append(key, value as string); // Convert other values to string
            }
        });

        // Append multiple images correctly
        if (vehicleData.image && Array.isArray(vehicleData.image)) {
            vehicleData.image.forEach((file: File) => {
                if (file instanceof File) {
                    formData.append("images", file); // ✅ Matches backend field name
                }
            });
        } else if (vehicleData.image instanceof File) {
            formData.append("images", vehicleData.image); // ✅ Single image case
        }

        const response = await fetch(`${API_URL}/vehicles`, {
            method: "POST",
            body: formData, // ✅ No need to set Content-Type manually
        });

        if (!response.ok) {
            throw new Error("Failed to upload vehicle.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error adding vehicle:", error);
        throw error;
    }
};



export const getVehicles = async () => {
    try {
        const response = await fetch(`${API_URL}/vehicles`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        throw error;
    }
};


export const getReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/reviews`);
      const data = await response.json();
  
      console.log("Raw API Response:", data); // Debugging
  
      return data; // Directly return the data since it's already an array
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  };
  
  

  export const addBooking = async (bookingData: { vehicleId: string; bookedFrom: string; bookedTill: string }) => {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            throw new Error("Failed to add booking.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error adding booking:", error);
        throw error;
    }
};



export const deleteBooking = async (bookingData: { vehicleId: string; bookedFrom: string; bookedTill: string }) => {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            throw new Error("Failed to delete booking.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting booking:", error);
        throw error;
    }
};


