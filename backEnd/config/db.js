import mongoose from 'mongoose'

export const connectDB = async ()=>{
    await mongoose.connect('mongodb://localhost:27017/ar-food').then(()=>console.log("DB Connected")); 
}

//mongodb+srv://akash1610:7784868961@cluster0.4qrsvvi.mongodb.net/ar-food