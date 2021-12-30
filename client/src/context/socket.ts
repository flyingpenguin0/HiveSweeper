import React from "react";
import { io, Socket } from "socket.io-client";
//import { SOCKET_URL } from "config";

let SOCKET_URL = "http://localhost:8000";

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
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);

export const SocketContext : React.Context<Socket> = React.createContext(socket);