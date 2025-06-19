import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email"),
    body("username")
      .notEmpty()
      .withMessage("username is required")
      .isString()
      .withMessage("username must be a string")
      .isLength({min: 3})
      .withMessage("username must be at least 3 characters"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isString()
      .withMessage("password must be a string")
      .isLength({min: 6})
      .withMessage("password must be at least 6 characters"),
  ];
};


export {
    userRegisterValidator
}