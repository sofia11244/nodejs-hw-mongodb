import Joi from 'joi';

// Create Contact Schema (Yeni bir iletişim eklerken doğrulama)
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a text',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name must not exceed {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must contain only digits',
      'string.min': 'Phone number must be at least {#limit} digits',
      'string.max': 'Phone number must not exceed {#limit} digits',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string().email().allow(null, '').messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean().required().messages({
    'boolean.base': 'isFavourite must be true or false',
    'any.required': 'isFavourite is required',
  }),
  contactType: Joi.string()
    .valid('personal', 'home', 'work')
    .required()
    .messages({
      'any.only': 'Contact type must be one of personal, home, or work',
      'any.required': 'Contact type is required',
    }),
});

// Kullanım örneği
const validateContact = (contactData) => {
  const { error } = createContactSchema.validate(contactData, {
    abortEarly: false, // Tüm hataları almak için
  });

  if (error) {
    return error.details.map((err) => err.message); // Hata mesajlarını liste olarak döndür
  }
  return null; // Hata yoksa null döndür
};

export default validateContact;

// Update Contact Schema (Bir iletişimi güncellerken doğrulama)
export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(), // Güncellemelerde zorunlu değil
  age: Joi.number().integer().min(6).max(100).optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  avgMark: Joi.number().min(2).max(12).optional(),
  onDuty: Joi.boolean().optional(),
});
