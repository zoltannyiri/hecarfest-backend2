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
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const categorySchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        readonly: true
    },
    name: {
        type: String,
        required: true,
        unique: true //ez is új!!!
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });
//ez is új!!!
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryModel.find({}, '_id name')
            .sort({ date: -1 });
        if (!categories || categories.length === 0) {
            // Ha nincsenek kategóriák, létrehozzuk az alapértelmezett kategóriákat
            const defaultCategories = [
                { _id: '66fe967fdc782b1e24ede2b8', name: 'Legszebb autó' },
                { _id: '66fe9694dc782b1e24ede2ba', name: 'Legmacsósabb autó' },
                { _id: '66fe969bdc782b1e24ede2bc', name: 'Legcsajosabb autó' }
            ];
            yield categoryModel.insertMany(defaultCategories);
            return defaultCategories;
        }
        return categories;
    }
    catch (error) {
        console.error('Hiba a kategóriák lekérésénél:', error);
        throw error;
    }
});
const validate = (message) => {
    const schema = joi_1.default.object().keys({
        name: joi_1.default.string().required(),
        description: joi_1.default.string()
    });
    return schema.validate(message);
};
const categoryModel = (0, mongoose_1.model)("category", categorySchema, "Categories");
exports.default = { categoryModel, validate };
