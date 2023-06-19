import jwt from "jsonwebtoken";

export const signToken = (obj, expiresIn = "30m") =>
  jwt.sign({ ...obj }, process.env.NEXTAUTH_SECRET, {
    expiresIn,
  });

export const jwtVerify = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

    return decoded;
  } catch (error) {
    return null;
  }
};
