import  mongoose, { Schema, model, connect } from "mongoose";

/* const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: "game_records"
}; */

interface Game  {
    index : number;
    name : string;
    level : string;
    time : number;
}

type game = {
    index : number;
    name : string;
    level : string;
    time : number;
}

enum Level{
    EASY = 1,
    MEDIUM,
    HARD,
    EXTREME
}

const gameSchema = new Schema<Game>({
    index : {type : Number, required : true, unique : true},
    name : {type : String, required : true, trim:true, default:"NoNamed"},
    level : {type : String, required : true, enum:["EASY", "MEDIUM", "HARD", "EXTREME"], default:"EASY"},
    time : {type : Number, required : true, min:0, max:86400}
}, {
    timestamps: true
});

export const GameModel = model<Game>("Game", gameSchema);

gameSchema.statics.create = async function(payload : game[]){
    const game = await new this(payload);
    return game.save();
}

gameSchema.statics.findByLevel = async function(payload : Level){
    return await this.find({"level":payload});
}

gameSchema.statics.findAll = async function(){
    return await this.find({});
}