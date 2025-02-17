// src/controllers/auth.js

import { registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

// src/controllers/auth.js

import { loginUser } from '../services/auth.js';

/* Dosyanın diğer kodları */

export const loginUserController = async (req, res) => {
  await loginUser(req.body);

  // Daha sonra bu kontrolörü tamamlayacağız
};
