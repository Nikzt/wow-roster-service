"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 4141;
app.get('/', (_req, res) => {
    res.send('Hello World!');
});
app.get('/roster/:id', (req, res) => {
    const rosterId = req.params.id;
    fs_1.default.readFile(path_1.default.resolve('data', 'rosters.json'), 'utf8', (err, data) => {
        const rosters = JSON.parse(data);
        const roster = rosters[rosterId];
        if (!roster)
            res.sendStatus(404);
        else
            res.send(roster);
    });
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map