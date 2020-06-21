import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

//model imports
import { User } from "./../models/user";

const router = express.Router();
const route = "SignUp User";

//validation middlewares
import { validateRequest } from "./../middleware/validate-request";

//error Classes
import { BadRequestError } from "./../errors/bad-request-error";

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already in use.");
    }
    const user = User.build({ email, password });

    await user.save();

    // generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    //store in sessio
    // @ts-ignore
    req.session = {
      jwt: userJwt,
    };

    return res.status(201).send(user);
  }
);

export { router as signupRouter };
