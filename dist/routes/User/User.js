"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../../controllers");
var validate_1 = require("../../joi/validate");
exports.router = express_1.default.Router({
    strict: true
});
// ... /POST ...
// validate
exports.router.post('/', function (req, res, next) {
    var err = validate_1.validateReq(req.body).error;
    if (err) {
        return res.json(err);
    }
    else {
        next();
    }
});
exports.router.post('/', function (req, res) {
    console.log('post route');
    controllers_1.userController.create(req, res);
});
// ... /GET ...
exports.router.get('/', function (req, res, next) {
    // data returned from db
    var data = testData;
    // validate
    var err = validate_1.validateRes(data).error;
    if (err) {
        return res.json(err);
    }
    else {
        res.locals.data = data;
        next();
    }
});
exports.router.get('/', function (req, res) {
    controllers_1.userController.read(req, res);
});
var testData = {
    name: 'Nicole',
    food: 'hams',
    age: 20,
    another: 'asdfads'
};
