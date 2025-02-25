import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/contacts.js';
import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  try {
    const session = await SessionsCollection.findOne({ accessToken: token });

    if (!session) {
      next(createHttpError(401, 'Session not found'));
      return;
    }

    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      next(createHttpError(401, 'Access token expired'));
      return;
    }

    const user = await UsersCollection.findById(session.userId);
    if (!user) {
      next(createHttpError(401, 'User not found'));
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });

      req.user = decoded;
      next();
    });
  } catch {
    next(createHttpError(500, 'Internal Server Error'));
  }
};