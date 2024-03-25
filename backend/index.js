const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const port = 3000; // Use square bracket notation

connectToMongo();

const app = express();


app.use(cors());
app.use(express.json());

app.get("/check",(req,res) =>{
    res.json('hello');
})

/
app.use('/api/contact', require('./routes/Contact')); 
app.use('/api/service', require('./routes/Services')); 


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
