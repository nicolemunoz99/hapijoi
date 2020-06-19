"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outgoingAllUsersStruct = exports.outgoingSingleUserStruct = exports.singleUserStruct = void 0;
var Joi = require('@hapi/joi');
var nameStruct = Joi.object({
    namePref: Joi.string()
        .allow('')
        .min(2)
        .max(3),
    name: Joi.string()
        .min(2)
        .max(20)
        .required(),
    nameSuff: Joi.string()
        .allow('')
        .min(1)
        .max(4)
});
// add default 0, USD
var salaryStruct = Joi.object({
    currency: Joi.string()
        .default('USD')
        .length(3)
        .required(),
    salaryNum: Joi.number()
        .min(1)
        .max(999999999999)
        .required()
});
exports.singleUserStruct = Joi.object({
    name: nameStruct.required(),
    salary: salaryStruct.required(),
});
exports.outgoingSingleUserStruct = Joi.object({
    id: Joi.number()
        .min(1)
        .required(),
    data: exports.singleUserStruct
        .required()
});
exports.outgoingAllUsersStruct = Joi.array()
    .items(exports.outgoingSingleUserStruct);
