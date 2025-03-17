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
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const voting_model_1 = __importDefault(require("../models/voting.model"));
class votingController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.votingModel = voting_model_1.default.votingModel;
        this.Voting = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const body = req.body;
            const category_id = body.category;
            const hasip = yield this.votingModel.findOne({ category: category_id, ip: ((_a = req.headers['x-forwarded-for']) === null || _a === void 0 ? void 0 : _a.toString().split(',')[0]) || req.ip || req.connection.remoteAddress });
            if (category_id && !hasip) {
                try {
                    body["_id"] = new mongoose_1.default.Types.ObjectId();
                    body["category"] = category_id;
                    body["ip"] = ((_b = req.headers['x-forwarded-for']) === null || _b === void 0 ? void 0 : _b.toString().split(',')[0]) || req.ip || req.connection.remoteAddress;
                    yield this.votingModel.create(body);
                    res.send({ message: "OK" });
                }
                catch (error) {
                    res.status(400).send({ message: error.message });
                }
            }
            else {
                res.status(404).send({ message: "Category not found!" });
            }
        });
        this.GetVotings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const votings = yield this.votingModel.aggregate([
                {
                    $group: {
                        _id: "$category",
                        count: { $sum: 1 }
                    }
                }
            ]);
            if (votings) {
                res.send(votings);
            }
            else {
                res.status(404).send({ message: "Votings not found!" });
            }
        });
        //új
        // voting.controller.ts
        this.GetDetailedVotings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const votings = yield this.votingModel.find()
                    .select('_id licence_plate category date')
                    .sort({ date: -1 });
                console.log('Szavazatok:', votings); // Debug log
                if (!votings || votings.length === 0) {
                    return res.status(404).json({
                        message: 'Nincsenek szavazatok'
                    });
                }
                res.json(votings);
            }
            catch (error) {
                console.error('Hiba történt a szavazatok lekérésénél:', error); // Debug log
                res.status(500).json({
                    message: 'Hiba történt a szavazatok lekérésénél',
                    error: error.message
                });
            }
        });
        this.router.get("/votings", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            this.GetVotings(req, res).catch(next);
        }));
        this.router.post("/voting/:category", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            this.Voting(req, res).catch(next);
        }));
        this.router.get('/voting/details', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.GetDetailedVotings(req, res);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ error: 'Hiba történt a szavazások lekérdezésekor' });
            }
        }));
    }
}
exports.default = votingController;
