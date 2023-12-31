const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    await request(app).post('/api/users').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'MyPass777!'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/api/userlogin').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/api/userlogin').send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/api/user')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/api/userDelete')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/api/userDelet')
        .send()
        .expect(401)
})

test('should upload avatar image', async ()=>{
    await request(app)
         .post('/users/me/avatar')
         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
         .attach('avatar','tests/fixtures/tokyo-revengers-quotes.jpg')
         .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))     
})

test("should update valid user",async ()=>{
    await request(app)
          .patch('/api/userPatch')
          .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
          .send({
              name : 'jess'
          })
          .expect(200)
          const user = await User.findById(userOneId)
          expect(user.name).toEqual('jess')        
})

test("should not update invalid user",async ()=>{
    await request(app)
          .patch('/api/userPatch')
          .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
          .send({
              location: 'india'
          })
          .expect(400)
               
})