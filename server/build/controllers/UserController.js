"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let data = [
    {
        id: 1,
        name: "Adi",
    },
    {
        id: 2,
        name: "Budi",
    },
    {
        id: 3,
        name: "Cadi",
    },
];
class UserController {
    index(req, res) {
        console.log("ini adalah index users");
        return res.send(data);
    }
    create(req, res) {
        const { id, name } = req.body;
        data.push({
            id,
            name,
        });
        return res.send("Success add data");
    }
    show(req, res) {
        const { id } = req.params;
        let person = data.find((item) => item.id == id);
        return res.send(person);
    }
    update(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        let person = data.find((item) => item.id == id);
        person.name = name;
        return res.send("succes update data");
    }
    delete(req, res) {
        const { id } = req.params;
        let people = data.filter((item) => item.id != id);
        return res.send(people);
    }
}
exports.default = new UserController();
