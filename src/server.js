"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const categories_controller_1 = __importDefault(require("./controllers/categories.controller"));
const voting_controller_1 = __importDefault(require("./controllers/voting.controller"));
dotenv_1.default.config();
new app_1.default([new categories_controller_1.default(), new voting_controller_1.default()]);
