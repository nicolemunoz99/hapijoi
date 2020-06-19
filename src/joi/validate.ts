const Joi = require('@hapi/joi');


const nameStruct: any = Joi.object({
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
const salaryStruct: any = Joi.object({
  currency: Joi.string()
    .default('USD')
    .length(3)
    .required(),
  salaryNum: Joi.number()
    .min(1)
    .max(999999999999)
    .required()
  });


export const singleUserStruct: any = Joi.object({
  name: nameStruct.required(),
  salary: salaryStruct.required(),
});



export const outgoingSingleUserStruct: any = Joi.object({
  id: Joi.number()
    .min(1)
    .required(),
  data: singleUserStruct
    .required()
});

export const outgoingAllUsersStruct: any = Joi.array()
  .items(outgoingSingleUserStruct)
