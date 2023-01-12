"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = __importDefault(require("../helpers/Authentication"));
const db = require("../db/models");
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const hashedPassword = yield Authentication_1.default.hashPassword(password);
            yield db.User.create({
                username,
                password: hashedPassword,
            });
            return res.send("sukses registrasi");
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const user = yield db.User.findOne({
                where: { username },
            });
            //check password
            if (user) {
                let compare = yield Authentication_1.default.comparePassword(password, user.password);
                if (compare) {
                    let access_token = Authentication_1.default.generateToken(user.id, username, user.password);
                    return res.send({
                        access_token,
                    });
                }
            }
            return res.send("email/password salah");
        });
        this.profile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.send(req.app.locals.credential);
        });
    }
}
exports.default = new AuthController();
