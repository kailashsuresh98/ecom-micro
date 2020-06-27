import mongoose from "mongoose";
import { app } from "./app";

const PORT = 3000;
const SERVICE_NAME = "auth";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("Env Var JWT_KEY not defined");
    }
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log(err);
  }
};

app.listen(PORT, () => {
  console.log(`running ${SERVICE_NAME} on port ${PORT}`);
});

start();
