require("dotenv").config();
const mongoose = require('mongoose');
const mongoURI = process.env['MONGO_URL']; // Use square bracket notation

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connected to MongoDB successfully");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
};

module.exports = connectToMongo;
