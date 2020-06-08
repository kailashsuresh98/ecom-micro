import express from 'express';

const router = express.Router();
const route = 'SignIn User';

router.post('api/users/signin',(req, res)=>{
    res.send(`Route: ${route}`);
});

export { router as signinRouter };