const express = require('express')
const Todo = require('../models/todo')
const {createTodo,getToDo,getTodoById,updateTodo,deleteTodo} = require('../controllers/todo/todoControllers')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/todos', auth,createTodo)

router.get('/todos', auth,getToDo )

router.get('/todos/:id', auth,getTodoById )

router.patch('/todos/:id', auth, updateTodo)

router.delete('/todos/:id', auth,deleteTodo )

module.exports = router