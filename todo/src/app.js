const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const todoRouter = require('./routers/todo')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const dotenv = require('dotenv')
const cors = require('cors');
dotenv.config()
const app = express() 
app.use(cors());
app.options('*', cors());
app.use(express.json())

const options = {
    definition:{
      openapi: '3.0.0',
      info:{
        title : 'Nodejs api project for mongodb',
        version: '1.0.0'
      },
      servers:[
        {
          url:'http://localhost:6000/'
        }
      ]
    },
    apis:['./routers/user.js']
  }

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.use(userRouter)
app.use(todoRouter)

module.exports = app