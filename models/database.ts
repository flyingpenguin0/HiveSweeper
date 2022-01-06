import  { Schema, model, connect } from "mongoose";
const mongoose = require("mongoose");

/* const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: "game_records"
}; */

export interface Game  {
    index : number;
    name : string;
    level : string;
    time : number;
}

export type game = {
    index : number;
    name : string;
    level : string;
    time : number;
}

export enum Level{
    EASY = 1,
    MEDIUM =2,
    HARD =3,
    EXTREME =4
}

export const gameSchema = new Schema<Game>({
    index : {type : Number, required : true, unique : true, default:0},
    name : {type : String, required : true, trim:true, default:"NoNamed", minLength:1, maxLength:16},
    level : {type : String, required : true, enum:["EASY", "MEDIUM", "HARD", "EXTREME"], default:"EASY"},
    time : {type : Number, required : true, min:0, max:86400}
}, {
    timestamps: true
});

gameSchema.statics.create = async function(payload : game[]){
    const game = await new this(payload);
    return game.save();
}

gameSchema.statics.findTopTenByLevel = async function(payload : Level){
    return await this.find({"level":payload}).sort("time").limit(10);
}

gameSchema.statics.findAll = async function(){
    return await this.find({});
}

gameSchema.statics.deleteByID = async function(payload : number){
    return await this.deleteOne({"index":payload});
}

gameSchema.statics.deleteByLevel = async function(payload : Level){
    return await this.deleteMany({"level":payload});
}

gameSchema.statics.deleteAll = async function(){
    return await this.deleteMany({});
}

require("dotenv").config({path:__dirname+'../.env'});

const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

gameSchema.plugin(autoIncrement.plugin,{
    model : "GameModel",
    field : "index",
    startAt : 1,
    increment : 1
});


module.exports = mongoose.model("Game", gameSchema);