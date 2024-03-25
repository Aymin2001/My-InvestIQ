const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://ayminbashir2001:H59GsnpEVCggm4Zk@test.je7r5cq.mongodb.net/"; 

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
