import express from 'express';

const router = express.Router();
const route = 'SignOut User';

router.post('/api/users/signout',(req, res)=>{
    req.session  = null;
    res.send({});
});

export { router as signoutRouter };