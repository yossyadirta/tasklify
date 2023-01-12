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
const TodoService_1 = __importDefault(require("../services/TodoService"));
class TodoController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const services = new TodoService_1.default(req);
            const todos = yield services.getAll();
            return res.status(200).json({
                data: todos,
            });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const services = new TodoService_1.default(req);
            const todo = yield services.store();
            return res.status(201).json({
                data: todo,
                message: "sukses create todo",
            });
        });
        this.show = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const services = new TodoService_1.default(req);
            const todo = yield services.getOne();
            return res.status(200).json({
                data: todo,
            });
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const services = new TodoService_1.default(req);
            const todo = yield services.update();
            return res.status(201).json({
                message: "updated todo",
            });
        });
        this.updateStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const services = new TodoService_1.default(req);
            yield services.updateStatus();
            return res.status(201).json({
                message: "updated todo",
            });
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const services = new TodoService_1.default(req);
            yield services.delete();
            return res.status(201).json({
                message: "deleted todo",
            });
        });
    }
}
exports.default = new TodoController();
