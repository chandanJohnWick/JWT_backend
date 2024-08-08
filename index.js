"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", function (req, res) {
    console.log(req.body);
    res.send("Hello World!");
});
app.post("/login", function (req, res) {
    console.log(req.body);
    var publickey = req.body.publickey;
    var token = jwt.sign({ publickey: publickey }, "secret", { expiresIn: "5m" }, function (err, token) {
        if (err)
            throw err;
        res.json({ token: token });
    });
});
app.post("/protected", function (req, res) {
    console.log(req.body);
    var bearer = req.headers.authorization;
    if (bearer) {
        var token = bearer.split(" ")[1];
        jwt.verify(token, "secret", function (err, decoded) {
            if (err) {
                res.sendStatus(403);
            }
            else {
                res.json(decoded);
            }
        });
    }
});
app.listen(8000, function () {
    console.log("Server listening on port 8000!");
});
