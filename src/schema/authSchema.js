import Joi from "joi"

export const schemaSignup = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.ref("password")
});

export const schemaSignin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
})