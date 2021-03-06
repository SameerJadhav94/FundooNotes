const Joi = require('joi');

class Validation {
  authRegister = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(30)
      .required()
      .pattern(/^[A-Z]{1}[a-z]{1,}$/),

    lastName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .pattern(/^[A-Z]{1}[a-z]{2,}$/),

    email: Joi.string()
      .pattern(/^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/)
      .required(),

    password: Joi.string()
      .pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
      .required(),

  });

  authLogin = Joi.object({
    email: Joi.string()
      .pattern(/^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/)
      .required(),

    password: Joi.string()
      .required()
      .pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),

  });

  authForgotPassword = Joi.object({
    email: Joi.string()
      .pattern(/^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/)
      .required(),
  });

  authResetPassword = Joi.object({
    email: Joi.string()
      .pattern(/^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/)
      .required(),

    password: Joi.string()
      .required()
      .pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),

    code: Joi.string()
      .required(),
  });

  createNoteValidation = Joi.object({
    userId: Joi.string(),
    title: Joi.string().min(2).required(),
    description: Joi.string().min(1).required(),
  });

  getNoteValidation = Joi.object({
    id: Joi.string().required(),
  });

  getNoteByIdValidation = Joi.object({
    userId: Joi.string().required(),
    noteId: Joi.string().required(),
  });

  updateNoteByIdValidation = Joi.object({
    id: Joi.string().required(),
    userId: Joi.string(),
    title: Joi.string().min(2),
    description: Joi.string().min(1),
  });

  deleteNoteById = Joi.object({
    userId: Joi.string().required(),
    noteId: Joi.string().required().min(24),
  });

  labelValidation = Joi.object({
    userId: Joi.string().required(),
    noteId: Joi.string().required().min(24),
    label: Joi.string().required().min(2),
  });

  getLabelValidation = Joi.object({
    id: Joi.string().required(),
  });

  getLabelByIdValidation = Joi.object({
    userId: Joi.string().required(),
    id: Joi.string().required().min(24),
  });

  updateLabelByIdValidations = Joi.object({
    id: Joi.string().required().min(24),
    userId: Joi.string().required(),
    label: Joi.string().min(2).required(),
  });

  deleteLabelByIdValidations = Joi.object({
    id: Joi.string().required().min(24),
    userId: Joi.string().required(),
  });
}
module.exports = new Validation();
