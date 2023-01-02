"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", (req, res) => {
            res.send("Ini adalah endpoint users");
        });
        this.router.post("/", (req, res) => {
            res.send(req.body);
        });
    }
}
exports.default = new UserRoutes().router;
