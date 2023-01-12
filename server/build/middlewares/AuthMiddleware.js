"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const Authentication_1 = __importDefault(require("../helpers/Authentication"));
const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("no token");
    }
    const access_token = req.headers.authorization.split(" ")[1];
    try {
        const credential = Authentication_1.default.verifyToken(access_token);
        if (credential) {
            req.app.locals.credential = credential;
            return next();
        }
        else {
            return res.send("Invalid token");
        }
    }
    catch (error) {
        res.send(error);
    }
};
exports.auth = auth;
