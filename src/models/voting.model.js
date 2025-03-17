"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const votingSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        readonly: true
    },
    licence_plate: {
        type: String,
        required: true,
        unique: false
    },
    category: {
        type: String,
        ref: "Category",
        readonly: true
    },
    ip: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });
const votingModel = (0, mongoose_1.model)("voting", votingSchema, "Voting");
exports.default = { votingModel };
