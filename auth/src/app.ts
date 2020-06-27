import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

//routes
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

//error handler middleware
import { errorHandler } from "./middleware/error";

//404 handler
import { NotFoundError } from "./errors/not-found-error";


const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

//Route handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app } ;