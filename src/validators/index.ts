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

const userLoginValidator = () => {

  return [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isString()
      .withMessage("password must be a string")
      .isLength({min: 6})
      .withMessage("password must be at least 6 characters"),
  ];
};

const bookValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isString()
      .withMessage("title must be a string"),
    body("author")
      .notEmpty()
      .withMessage("author is required")
      .isString()
      .withMessage("author must be a string"),
    body("description")
      .notEmpty()
      .withMessage("description is required")
      .isString()
      .withMessage("description must be a string"),
    body("price")
      .notEmpty()
      .withMessage("price is required")
      .isNumeric()
      .withMessage("price must be a number"),
    body("category")
      .notEmpty()
      .withMessage("category is required")
      .isString()
      .withMessage("category must be a string"),
    body("isbn")
      .notEmpty()
      .withMessage("isbn is required")
      .isString()
      .withMessage("isbn must be a string"),
  ];
};

export {
    userRegisterValidator,
    userLoginValidator
}