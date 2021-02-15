import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../types';

const JWT_SECRET = 'PerfectlySafeSecretInGit';
const JWT_REFRESH_SECRET = 'PerfectlySafeSecretInGit';
const AUTH_COOKIE_NAME = 'X-AUTH-TOKEN';
const REFRESH_COOKIE_NAME = 'X-REFRESH-TOKEN';

/**
 * Adds some additional parameters in the payload.
 * @param user User object to be inserted in payload
 */
function generatePayload(user: User) {
  return {
    iat: Math.floor(Date.now() / 1000) - 30,
    iss: 'gRPIT',
    user
  };
}

/**
 * Creates auth token with user in the payload
 * @param user User object
 */
function getAuthToken(user: User) {
  let payload = generatePayload(user);
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

/**
 * Creates refresh token with user in the payload.
 * @param user User object
 */
function getRefreshToken(user: User) {
  const payload = generatePayload(user);
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

/**
 * Verifies signed Auth JWT token.
 * @param signedJWT
 */
function verifyAuthJWT(signedJWT) {
  try {
    return jwt.verify(signedJWT, JWT_SECRET);
  } catch (error) {
    return false;
  }
}

/**
 * Verifies signed Refresh JWT token
 * @param refreshJWT
 */
function verifyRefreshJWT(refreshJWT) {
  try {
    return jwt.verify(refreshJWT, JWT_REFRESH_SECRET);
  } catch (error) {
    return false;
  }
}

/**
 * Generates JWT from user payload and sets the auth cookie
 * @param user User payload
 * @param res Express response object
 */
export function setAuthCookie(user: User, res: Response) {
  const authToken = getAuthToken(user);
  const refreshToken = getRefreshToken(user);
  return res
    .cookie(AUTH_COOKIE_NAME, authToken)
    .cookie(REFRESH_COOKIE_NAME, refreshToken);
}

/**
 * Middleware to set user object on request.
 * Creates new token from refresh token if it is expired.
 * If a user is not present, user is set to none. This can be used by another middleware/wrapper function to do redirection.
 *
 * @param req Express reuest object
 * @param res Express response object
 * @param next Express next function
 */
export function getUserFromCookie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.cookies[AUTH_COOKIE_NAME];
  const payload = verifyAuthJWT(authToken);

  if (payload) {
    req.user = payload['user'];
  } else {
    const refreshToken = req.cookies[REFRESH_COOKIE_NAME];
    const refreshPayload = verifyRefreshJWT(refreshToken);

    if (refreshPayload) {
      const user = refreshPayload['user'];
      req.user = user;
      setAuthCookie(user, res);
    } else {
      req.user = null;
    }
  }
  next();
}

export function authRequired(req: Request, res: Response, next: NextFunction) {
  if (req.user?.id) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'Unauthorized. The user is not allowed to perform this action.'
    });
  }
}
