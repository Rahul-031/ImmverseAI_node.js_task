const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const todoRouter = require('./routers/todo')
// const swaggerJSDoc = require('swagger-jsdoc')
const SwaggerUi = require('swagger-ui-express')
const dotenv = require('dotenv')
const cors = require('cors');
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./api.yaml");
const fileUpload = require("express-fileupload");
dotenv.config()
const app = express() 
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerJSDocs));
app.use(fileUpload());

// const options = {
//     definition:{
//       openapi: '3.0.0',
//       info:{
//         title : 'Nodejs api project for todo',
//         version: '1.0.0'
//       },
//       servers:[
//         {
//           url:'http://localhost:8000/'
//         },
//       ],
//     },
//     apis:["./routers/*.js"]
//   }


// const swaggerSpec = swaggerJSDoc(options)

app.use(express.json())
// app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.use("/api/",userRouter)
app.use("/api/",todoRouter)

module.exports = app