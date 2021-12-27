const path = require('path');
import express = require('express');
const app = express();
app.use(express.json());
const helmet = require("helmet");
app.use(helmet());

require("dotenv").config({path:__dirname+'/.env'});
const PORT = process.env.PORT || 3001;

const cors = require("cors");
app.use(cors());

// MongoDB / Mongoose connection Setup
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

import { Game, game, gameSchema } from "./models/database";
const GameModel = require("./models/database");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(connection);
gameSchema.plugin(autoIncrement.plugin,{
    model : "GameModel",
    field : "index",
    startAt : 1,
    increment : 1
});

const gameRouter = require("./routes/game");
app.use("/api", gameRouter);

// Serve the files for the built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other requests will return the React app
app.get('/*', (req : express.Request, res : express.Response) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


// socket.io setup
interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    createRecord : (name:string) => void;
    confirmRecord : (game:game) => void;
    errRecord : (err:any) => void;
}
interface ClientToServerEvents {
    hello: () => void;
}
interface InterServerEvents {
    ping: () => void;
}
interface SocketData {
    name: string;
    level: string;
    time: number;
}

import { createServer } from "http";
import { Server, Socket } from "socket.io";
const httpServer = createServer();

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

io.on("connection", ( socket:Socket ) =>{
    let start : Date;
    let end : Date;
    let level : string;

    let maxTime = 24*60*60;
    let timeOutID : NodeJS.Timeout;
    const timer = {
        start : () => {
            for(let i=0; i<maxTime; i++){  
                timeOutID = setTimeout(()=>{
                    socket.emit("timer",{sec:i} );
                    console.log(i);
                },1000*i);
        
                if(i==maxTime-1){
                    clearTimeout(timeOutID);
                }
            }
        },
        end : () => {
            clearTimeout(timeOutID);
        }
    }

    socket.on("newGame",(data) => {
        start = new Date();
        level = data.level;
        timer.start();
    });
    socket.on("gameOver", ()=>{
        timer.end();
    });
    socket.on("endGame", ()=>{
        end = new Date();
        timer.end();
    });
    socket.on("createRecord", (data)=>{
        let passedSeconds = (end.getTime()-start.getTime()) *0.001;
        let content = {name : data.name, level : data.level, time : passedSeconds};
        GameModel.create(content)
        .then( (game:game) => socket.emit("record_succ", game))
        .catch( (err: any) => socket.emit("record_err", err));
    });

    socket.on("disconnect", ()=>{
        console.log("socket disconnected");
    });
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
