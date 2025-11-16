import Joi from "joi";

export const registerValidation = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().min(3).required(),
    mobile: Joi.string().min(10).required(),
    email: Joi.string().email().required(),    
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().min(6).required(),

  });
  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
