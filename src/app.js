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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor(controllers) {
        var _a;
        this.mongoUrl = (_a = process.env.MONGO_DB_URL) !== null && _a !== void 0 ? _a : "mongodb+srv://hecarfest:admin@cluster0.0rvby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.connectToTheDatabase().then(() => {
            this.listen();
        });
        controllers.forEach(controller => {
            this.app.use("/api", controller.router);
        });
    }
    listen() {
        this.app.listen(8000, () => {
            console.log("The application is available on port 8000!");
        });
    }
    connectToTheDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            mongoose_1.default.set("strictQuery", true);
            try {
                yield mongoose_1.default.connect((_a = this.mongoUrl) !== null && _a !== void 0 ? _a : "", { connectTimeoutMS: 10000 });
            }
            catch (error) {
                console.log({ message: error.message });
            }
        });
    }
}
exports.default = App;
