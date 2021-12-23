import express = require('express');
const router = require('express').Router();
import { Game, game } from "../models/database";
const GameModel = require("../models/database");

router.post("/", (req: express.Request, res : express.Response) => {
    GameModel.create(req.body)
    .then( (game : game) => res.json(game))
    .catch( (err : any) => res.status(500).send(err));
});

router.get("/:level", (req : express.Request, res : express.Response) => {
    GameModel.findByLevel(req.params.level)
    .then((game : game ) => {res.json(game)})
    .catch((err : any) => res.status(500).send(err));
});

router.get("/", (req : express.Request, res : express.Response) => {
    GameModel.findAll()
    .then((game : Array<game>) => {res.json(game)})
    .catch((err : any) => res.status(500).send(err));
});

module.exports = router;