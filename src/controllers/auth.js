import { body, validationResult } from 'express-validator';
import { ONE_DAY } from '../constants/index.js';
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshUsersSession,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';


// Validation for reset password
export const validateResetPassword = [
  body('password').optional().isString().withMessage('Password must be a string').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('token').optional().isString().withMessage('Token must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: 'Validation Error',
        data: {
          message: 'Validation Error',
          errors: errors.array(),
        },
      });
      
    }
    next();

  },
];


// Validation for requesting reset email
export const validateRequestResetEmail = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// Use validation in the reset password flow
export const requestResetEmailController = [
  validateRequestResetEmail,
  async (req, res) => {
    await requestResetToken(req.body.email);
    res.json({
      message: 'Reset password email has been successfully sent.',
      status: 200,
      data: {},
    });
  },
];

// Use validation in the reset password flow
export const resetPasswordController = [
  validateResetPassword,
  async (req, res) => {
    await resetPassword(req.body);

    res.json({
      message: 'Password has been successfully reset.',
      status: 200,
      data: {},
    });
  },
];

