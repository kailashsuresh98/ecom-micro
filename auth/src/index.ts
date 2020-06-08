import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose'


//routes
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';


//error handler middleware 
import { errorHandler } from './middleware/error';

//404 handler
import { NotFoundError } from './errors/not-found-error';

const PORT = 3000;
const SERVICE_NAME = 'auth';
const app = express();
app.use(json());

//Route handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*',(req, res)=>{
    throw new NotFoundError();
})
app.use(errorHandler);

const start = async () => {
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch(err) {
        console.log(err);
    }

}

app.listen(PORT,()=>{
    console.log(`running ${SERVICE_NAME} on port ${PORT}`);
});

start();