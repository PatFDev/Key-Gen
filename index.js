const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

dotenv.config();


mongoose.connect(
    process.env.DB_CONNECT,() => 
    console.log('connected to db!')
);


app.use(express.json());

//Route Middlewears
app.use('/api/user', authRoute);

app.listen(3000, () => console.log ('Server Up and Running'));