import  { Schema, model, connect } from "mongoose";
const mongoose = require("mongoose");

export interface Feedback {
    index:number;
    name:string | null;
    email:string | null;
    title:string | null;
    content:string;
}

export type feedback = {
    index:number;
    name:string | null;
    email:string | null;
    title:string | null;
    content:string;
}

const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

export const feedbackSchema = new Schema<Feedback>({
    index : {type : Number, required : true, unique : true, default:0},
    name : {type : String, required : false, trim:true, default:"NoNamed", maxLength:16},
    email : {type : String, required : false, trim:true, maxLengh:40},
    title : {type : String, required : false, trim:true,  maxLength:40},
    content : {type : String, required : true, minLength:1, maxLength:300}
}, {
    timestamps: true
});

feedbackSchema.plugin(autoIncrement.plugin,{
    model : "Feedback",
    field : "index",
    startAt : 1,
    increment : 1
});

feedbackSchema.statics.create = async function (payload:feedback){
    const feedback = await new this(payload);
    return feedback.save();
}

feedbackSchema.statics.findAll = async function(){
    return await this.find({});
}

module.exports = mongoose.model("Feedback", feedbackSchema);