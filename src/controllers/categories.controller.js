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
const categories_model_1 = __importDefault(require("../models/categories.model"));
class categoryController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.categoryModel = categories_model_1.default.categoryModel;
        this.NewCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const { error } = categories_model_1.default.validate(body);
            if (error) {
                res.status(400).send({ message: error.details[0].message });
                return;
            }
            try {
                body["_id"] = new mongoose_1.default.Types.ObjectId();
                const newCategory = new this.categoryModel(body);
                yield newCategory.save();
                res.send({ message: "OK" });
            }
            catch (error) {
                res.status(400).send({ message: error.message });
            }
        });
        this.UpdateCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const id = req.query.id;
            const category = yield this.categoryModel.findOne({ _id: id });
            if (category) {
                yield this.categoryModel.replaceOne({ _id: id }, category, { runValidators: true });
                res.send({ message: "OK" });
            }
            else {
                res.status(404).send({ message: "Category not found!" });
            }
        });
        this.GetCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryModel.find();
            if (category) {
                res.send({ data: category, count: category.length });
            }
            else {
                res.status(404).send({ message: "Category not found!" });
            }
        });
        this.router.get("/category", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            this.GetCategory(req, res).catch(next);
        }));
        this.router.post("/category", (req, res, next) => {
            this.NewCategory(req, res).catch(next);
        });
        this.router.put("/category/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            this.UpdateCategory(req, res).catch(next);
        }));
    }
}
exports.default = categoryController;
