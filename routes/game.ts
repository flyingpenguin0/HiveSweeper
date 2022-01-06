import express = require('express');
const router = require('express').Router();
import { Game, game, gameSchema, Level } from "../models/database";
import {Feedback, feedback, feedbackSchema} from "../models/feedback";
const GameModel = require("../models/database");
const FeedbackModel = require("../models/feedback");


router.post("/", (req: express.Request, res : express.Response) => {
    let newRecord = {}
    GameModel.create(req.body)
    .then( (game : game) => res.json(game))
    .catch( (err : any) => res.status(500).send(err));
});

router.get("/:level", (req : express.Request, res : express.Response) => {
    GameModel.findTopTenByLevel(req.params.level)
    .then((game : game ) => {
        res.json(game);
    })
    .catch((err : any) => res.status(500).send(err));
});

router.get("/", (req : express.Request, res : express.Response) => {
    GameModel.findAll()
    .then((game : Array<game>) => {res.json(game)})
    .catch((err : any) => res.status(500).send(err));
});

router.delete("/", (req : express.Request, res : express.Response) => {
    GameModel.deleteAll()
    .then((game : Array<game>) => {res.json(game)})
    .catch((err:any)=>{res.status(500).send(err)});
});

router.delete("/level/:level", (req : express.Request, res : express.Response) => {
    GameModel.deleteByLevel(req.params.level)
    .then((game : Array<game>) => {res.json(game)})
    .catch((err:any)=>{res.status(500).send(err)});
});

router.delete("/id/:id", (req : express.Request, res : express.Response) => {
    GameModel.deleteByID(req.params.level)
    .then((game : Array<game>) => {res.json(game)})
    .catch((err:any)=>{res.status(500).send(err)});
});

router.post("/feedback", (req: express.Request, res : express.Response) =>{
    let newFeedBack = {};
    FeedbackModel.create(req.body)
    .then((fb:feedback)=>{res.json(fb)})
    .catch((err : any) => res.status(500).send(err));
});

router.get("/feedback", (req: express.Request, res : express.Response) =>{
    FeedbackModel.findAll()
    .then((fb : any) => {res.json(fb)})
    .catch((err : any) => res.status(500).send(err));
});

module.exports = router;