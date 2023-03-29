import Joi from "joi";

export const redirectUrlValidation = Joi.string().custom((value) => {
  const pattern = /^http(s)?:\/\//i;
  if (!pattern.test(value)) {
    return "https://" + value;
  }
  return value;
}).uri().required().messages({
  'string.base': 'Redirect URL must be a string',
  'string.uri': 'Redirect URL must be a valid URL. Try adding `https://`',
  'any.required': 'Redirect URL is required',
})

export const activeValidation = Joi.boolean().required()

export const shortcodeGuidValidation = Joi.string().required()