// imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// schema
const schemaData = new mongoose.Schema({
    name : String ,
    email : String ,
    mobile : String
},{
    timestamps: true
});

const userModel = mongoose.model("user", schemaData)

// Routes for read purpose
// read data
// read_api - http://localhost:8080/
app.get("/",async (req, res) => {
    const data = await userModel.find({})

    res.json({ success : true , data : data } );
});

// create data //save data in mongodb
//cretae_api - http://localhost:8080/create
/*
 {
    "name" : "krishna",
    "email" : "krishna@gmail.com",
    "mobile" : 9675046095
 }
*/
app.post('/create', async(req , res) =>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success : true , message : "Data save successfully!" , data : data})
})

//  update data // save data in database
// update_api - http://localhost:8080/update
/*
*  {
       "id" : "",
       "name" : "",
       "email" : "",
       "mobile" : ""
   }
*/

app.put('/update' , async(req , res) => {
    console.log(req.body)
    const { id, ...rest } = req.body;
    console.log(rest)
    const data = await userModel.updateOne({_id : id},rest)
    res.send({success : true , message : "data updated succesfully!" , data : data})
    
})

// delete api
// delete_api - http://localhost:8080/delete/id

app.delete("/delete/:id" , async(req , res) => {
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true , message : "data deleted succesfully!" , data : data})
})



// MongoDB connection
const DB_URL = process.env.DB_URL; 
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to the database!");
    app.listen(PORT, (err) => { 
        if (err) {
            console.error("Server error:", err);
        } else {
            console.log(`Server is running on http://localhost:${PORT}`);
        }
    });
})
.catch((error) => {
    console.error("Database connection error:", error);
});



  

