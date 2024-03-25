const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const port = 3000; // Use square bracket notation

connectToMongo();

const app = express();


app.use(cors());
app.use(express.json());


// Allow requests from your frontend domain
const allowedOrigins = ['https://my-invest-iq-frontend.vercel.app/', 'https://my-invest-iq-backend.vercel.app/']; // Add your frontend domain(s) here
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


app.get("/check",(req,res) =>{
    res.json('hello');
})

/
app.use('/api/contact', require('./routes/Contact')); 
app.use('/api/service', require('./routes/Services')); 


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
