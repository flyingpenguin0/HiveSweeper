const path = require('path');
import express = require('express');
const app = express();
app.use(express.json());
const helmet = require("helmet");
app.use(helmet());

require("dotenv").config({path:__dirname+'/.env'});
const PORT : number = Number(process.env.PORT) || 8000;

const cors = require("cors");
const corsOptions = {cors : {
    origin : true,
    methods:["GET","POST"],
    credentials : true,
}}
app.use(cors(corsOptions));

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
    confirmRecord : (game:game) => void;
    errRecord : (err:any) => void;
}
interface ClientToServerEvents {
    createRecord : (name:string, level:string) => void;
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
const httpServer = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, corsOptions);

io.on("connection", ( socket:Socket ) =>{
    console.log(socket.id);

    let start : Date;
    let end : Date;
    let level : string;

    let maxTime = 60*60*12;
    let timeOutID : ReturnType<typeof setTimeout>;

    type callbackType = () => void;
    const timer = {
        start : () : void => {
            let i = 0;
            timeOutID = setInterval(()=>{
                socket.emit("timer", {sec:i} );
                console.log(i);
                i++;
                if(i==maxTime){
                    clearInterval(timeOutID);
                }
            }, 1000);

        },
        end : () : void => {
            clearInterval(timeOutID);
        }
    }

    socket.on("newGame",(data) => {
        timer.end();
        start = new Date();
        level = data.level;
        timer.start();

    });
    socket.on("gameOver", ()=>{
        timer.end();
    });
    socket.on("gameEnd", ()=>{
        end = new Date();
        timer.end();
    });

    socket.on("createRecord", (data)=>{
        let passedSeconds = Math.floor((end.getTime()-start.getTime()) *0.001);
        let content = {"name" : data.name, "level" : data.level, "time" : passedSeconds};
        console.log(content);
        GameModel.create(content)
        .then( (game:game) => socket.emit("record_succ", game))
        .catch( (err: any) => socket.emit("record_err", err));
    });

    socket.on("disconnect", ()=>{
        console.log("socket disconnected");
        timer.end();
    });
})

httpServer.listen(PORT, "localhost", () => {
    console.log(`Server listening on ${PORT}`);
});
