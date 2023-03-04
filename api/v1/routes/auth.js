const router = require("express").Router();
const { body } = require("express-validator");

const UserService = require("../services/user.service");
const AuthController = require("../controllers/auth.controller");
const Validation = require("../utils/validation");
const Passport = require("../utils/passport");

router.post(
  "/login",
  [
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 6, max: 25 }),
  ],
  Validation.validate,
  AuthController.login
);

router.post(
  "/signup",
  [
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 6, max: 25 }),
    body("email")
      .trim()
      .custom(async (value) => {
        try {
          const user = await UserService.getUserByEmail(value);
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        } catch (error) {
          return Promise.reject("Error occurred while validating e-mail");
        }
      }),
  ],
  Validation.validate,
  AuthController.signup
);

router.get("/test", Passport.isAuth, (req, res) => {
  return res.status(200).json({ success: true, msg: "Auth test" });
});

module.exports = router;
