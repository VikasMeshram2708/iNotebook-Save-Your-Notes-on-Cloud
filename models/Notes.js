const Joi = require("joi");

const NotesSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required(),
  description: Joi.string().trim().min(5).max(250).required(),
  tag: Joi.string().trim().min(3).optional(),
});

module.exports = NotesSchema;
