const express = require("express");

const app = express();

const axios = require("axios");

const bodyParser = require("body-parser");

const port = 3435;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async(req, res)=>{
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const activity = response.data;
    res.render("index.ejs", {data: activity});
})

app.post("/", async(req,res)=>{
    try{
        const type = req.body.type;
        const participants = req.body.participants;
    const url = `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`;
    const response = await axios.get(url);

    const randomActivity = response.data[Math.floor(Math.random()*response.data.length)];

    res.render("index.ejs", {data: randomActivity});
    }catch (error){
        if(error.response && error.response.status === 404){
            res.render("index.ejs", {error: "No activities match your criteria"});
        }else{
            res.render("index.ejs", {error: "Something went wrong. Try again later."});
        }
    }
})

app.listen(port, ()=>{
    console.log("Server is running on port 3435");

    
})