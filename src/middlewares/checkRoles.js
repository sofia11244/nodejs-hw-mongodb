import createHttpError from 'http-errors';

export const checkRoles = (role) => async (req, res, next) => {
  const { user } = req;
  if (!user) {
    next(createHttpError(401, 'User not authenticated')); // Unauthorized if no user
    return;
  }

  const { role: userRole } = user;
  if (role === 'USER' && userRole === 'USER') {
    next();
    return;
  }

  next(createHttpError(403, 'Forbidden: You are not authorized')); // Forbidden if user role doesn't match
};
