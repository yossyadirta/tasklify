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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
}
_a = Authentication;
Authentication.hashPassword = (password) => {
    return bcryptjs_1.default.hash(password, 10);
};
Authentication.comparePassword = (password, encryptedText) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield bcryptjs_1.default.compare(password, encryptedText);
    return result;
});
Authentication.generateToken = (id, username, password) => {
    const secretKey = process.env.JWT_SECRET_KEY || "rahasia";
    const token = jsonwebtoken_1.default.sign({ id, username, password }, secretKey);
    return token;
};
Authentication.verifyToken = (token) => {
    const secretKey = process.env.JWT_SECRET_KEY || "rahasia";
    return jsonwebtoken_1.default.verify(token, secretKey);
};
exports.default = Authentication;
