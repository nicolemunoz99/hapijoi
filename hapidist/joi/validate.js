"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRes = exports.validateReq = void 0;
var Joi = require('@hapi/joi');
exports.validateReq = function (data) {
    var schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .required()
    });
    var dataVal = schema.validate(data);
    return dataVal;
};
exports.validateRes = function (data) {
    var schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .required(),
        food: Joi.string()
            .alphanum()
            .min(3)
            .max(5)
            .required(),
        age: Joi.number()
            .integer()
            .min(18)
            .required()
    });
    var dataVal = schema.validate(data);
    return dataVal;
};
