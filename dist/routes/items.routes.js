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
const item_validation_1 = require("../middlewares/item-validation");
const item_controllers_1 = __importDefault(require("../controllers/item.controllers"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield item_controllers_1.default.getItems(req.query);
        res.status(200).send(items);
    }
    catch (error) {
        res.status(500).send("Failed to find items!");
    }
}));
router.get('/:id', item_validation_1.validateItemId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield item_controllers_1.default.getItemById(req.params.id);
        res.status(200).send(item);
    }
    catch (error) {
        res.status(500).send();
    }
}));
router.post('/', item_validation_1.validateItem, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield item_controllers_1.default.createItem(req);
        res.status(201).send();
    }
    catch (error) {
        res.status(500).send("Failed to add item!");
    }
}));
exports.default = router;
