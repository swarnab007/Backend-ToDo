import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ id: user._id }, "djsjgjohwjhnwigbnmfmag353553hj");
  return res
    .status(statusCode)
    .cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    .json({
      success: true,
      message,
    });
};
