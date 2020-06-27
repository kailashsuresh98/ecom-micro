import { it } from '@jest/globals'
import request from 'supertest';
import { app } from './../../app';


it('return a 201 on successful signup', async ()=>{
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@gmail.com',
        password: 'password'
    })
    .expect(201);
});

it('returns a 400 with invalid email', async ()=>{
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'testgmail.com',
        password: 'password'
    })
    .expect(400);
});

it('returns a 400 with invalid password', async ()=>{
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'testgmail.com',
        password: 'pa'
    })
    .expect(400);
});

it('returns a 400 with no email and password', async ()=>{
    return request(app)
    .post('/api/users/signup')
    .send({

    })
    .expect(400);
});

it(" disallows duplicate emails", async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@gmail.com',
        password: 'password'
    })
    .expect(201)

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@gmail.com',
        password: 'password'
    })
    .expect(400)
});

it("sets a cookie after signup", async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@gmail.com',
        password: 'password'
    })
    .expect(201)
});