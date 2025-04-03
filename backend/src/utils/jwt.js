import jwt from "jsonwebtoken";
import _ from "lodash";

export const signJwt = async (object, options) => {
  return jwt.sign(object, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = async (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_PUBLIC_KEY);
  } catch (e) {
    return null;
  }
};

export const signAccessToken = async (user, privateFields) => {
  const userJsonObject = _.omit(user.toJSON(), privateFields);

  const accessToken = await signJwt(userJsonObject, {
    expiresIn: "120m",
  });

  return accessToken;
};
