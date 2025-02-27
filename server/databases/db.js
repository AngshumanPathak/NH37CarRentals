import mongoose from "mongoose";


export const  Connection = async (USERNAME,PASSWORD) => {
    
    try {
      
       const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster2.dnifv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2`;
       await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true});
       console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Error while connecting to db", error.message);
    }
}

export default Connection;