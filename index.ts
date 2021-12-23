const path = require('path');
import express = require('express');
const app = express();
app.use(express.json());

require("dotenv").config({path:__dirname+'/.env'});
const PORT = process.env.PORT || 3001;

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true  })
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err:any) => {
    console.log(err);
});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB database connected!");
});

//app.use("/static", express.static(__dirname+"/public"));

app.get("/api", (req : express.Request, res : express.Response) => {
    res.json({ message: "Hello from server!" });
});

// Serve the files for the built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other requests will return the React app
app.get('*', (req : express.Request, res : express.Response) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});