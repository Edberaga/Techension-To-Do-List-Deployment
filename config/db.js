const mongoose = require('mongoose');

//Function for connecting to MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); //Asynchronously connect the MongoDB Compass
    console.log('MongoDB has connected...');       // Will be mention if its connected succesfully!
  } catch (err) {
    console.error(err.message);
    process.exit(1); //exit the app when its error
  }
};

module.exports = connectDB;
