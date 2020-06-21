import express from "express";
import { Request, Response } from "express";
import { Password } from "./../services/password";
import { User } from "./../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();
const route = "SignIn User";

import { validateRequest } from "./../middleware/validate-request";
import { body } from "express-validator";

import { BadRequestError } from "./../errors/bad-request-error";

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Bad Credentials");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError(" Bad Credentials");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    //@ts-ignore
    req.session = {
      jwt: userJwt,
    };

    res.send(existingUser);
  }
);

export { router as signinRouter };
