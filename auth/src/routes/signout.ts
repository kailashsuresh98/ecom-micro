import express from 'express';

const router = express.Router();
const route = 'SignOut User';

router.post('api/users/signout',(req, res)=>{
    res.send(`Route: ${route}`);
});

export { router as signoutRouter };