import express from 'express';

const router = express.Router();
const route = 'Current User';

router.get('api/users/currentuser',(req, res)=>{
    res.send(`Route: ${route}`);
});

export { router as currentUserRouter };