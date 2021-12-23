import express = require('express');
const router = require('express').Router();
const GameModel = require("../models/database");

router.post("/", (req: express.Request, res : express.Response) => {
    GameModel.create(req.body)
    .then( (game) => res.json(game))
    .catch( err => res.status(500).send(err));
});

router.get("/:level", (req : express.Request, res : express.Response) => {
    GameModel.findByLevel(req.params.level)
    .then((game) => {res.json(game)})
    .catch(err => res.status(500).send(err));
});

router.get("/", (req : express.Request, res : express.Response) => {
    GameModel.findAll()
    .then((game) => {res.json(game)})
    .catch(err => res.status(500).send(err));
});

export default router;