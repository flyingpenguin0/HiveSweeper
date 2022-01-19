import React from "react";
import { io, Socket } from "socket.io-client";
import ENDPOINT from "../config";

export type game = {
    index : number;
    name : string;
    level : string;
    time : number;
}

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    confirmRecord : (game:game) => void;
    errRecord : (err:any) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
    createRecord : (name:string, level:string) => void;
}
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("/", {
    secure:true
});

export const SocketContext : React.Context<Socket> = React.createContext(socket);