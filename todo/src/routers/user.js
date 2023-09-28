const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const {UserCreate,userLogin,userLogout,updateUser,deleteUser,logoutAllUsers} = require("../controllers/user/userControllers")

router.post('/users', UserCreate)

router.post('/users/login',userLogin )

router.post('/users/logout', auth,userLogout )

router.post('/users/logoutAll', auth,logoutAllUsers)

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth,updateUser)

router.delete('/users/me', auth,deleteUser )




const upload = multer({
    limits: {
        fileSize: 7000000 
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('file must be a doc'))
        }
        cb(undefined, true)
     }
})

router.post('/users/me/avatar', auth, upload.single('avatar'),async (req, res)=>{
     const buffer = await sharp(req.file.buffer).resize({ width:400, height:250}).png().toBuffer()
   
    req.user.avatar = buffer
    await req.user.save()
    res.send()
} ,(error, req, res, next)=>{
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router