const express= require('express');
const app= express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const database = require('./config/database')
const userNotes = require('./routes/notes');

// Connecting to database
database.connect();


app.use(express.json());
app.use(cookieParser());

app.get('/',(req, res)=>{
    return res.json({
        success: true,
        message: "Your server is up and running..."
    });
});


app.use("/api/auth/", userRoutes);
app.use("/api/notes/", userNotes);





app.listen(5000, ()=>{
    console.log(`App is listening at port: 5000`)
});
