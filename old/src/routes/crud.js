"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const resennas_1 = __importDefault(require("../controllers/resennas"));
const router = (0, express_1.Router)();
router.post('/resenna/:id', resennas_1.default.createResenna);
router.get('/resenna/:id', resennas_1.default.readResenna);
router.delete('/resenna/:id', resennas_1.default.deleteResenna);
module.exports = router;
