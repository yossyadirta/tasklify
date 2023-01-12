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
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../db/models");
class TodoService {
    constructor(req) {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const todos = yield db.Todo.findAll({
                where: {
                    user_id: this.credential.id,
                },
            });
            return todos;
        });
        this.store = () => __awaiter(this, void 0, void 0, function* () {
            const { description } = this.body;
            const todo = yield db.Todo.create({
                user_id: this.credential.id,
                description,
                status: "To-do",
            });
            return todo;
        });
        this.getOne = () => __awaiter(this, void 0, void 0, function* () {
            const { id } = this.params;
            const todo = yield db.Todo.findOne({
                where: {
                    id,
                    user_id: this.credential.id,
                },
            });
            return todo;
        });
        this.update = () => __awaiter(this, void 0, void 0, function* () {
            const { id } = this.params;
            const { description, status } = this.body;
            const todo = yield db.Todo.update({
                description,
                status,
            }, {
                where: {
                    id,
                    user_id: this.credential.id,
                },
            });
            return todo;
        });
        this.updateStatus = () => __awaiter(this, void 0, void 0, function* () {
            const { id } = this.params;
            const { status } = this.body;
            const todo = yield db.Todo.update({
                status,
            }, {
                where: {
                    id,
                    user_id: this.credential.id,
                },
            });
            return todo;
        });
        this.delete = () => __awaiter(this, void 0, void 0, function* () {
            const { id } = this.params;
            const todo = yield db.Todo.destroy({
                where: {
                    id,
                    user_id: this.credential.id,
                },
            });
            return todo;
        });
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
    }
}
exports.default = TodoService;
