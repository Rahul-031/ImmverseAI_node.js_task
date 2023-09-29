const express = require('express')
const Todo = require('../models/todo')
const {createTodo,getToDo,getTodoById,updateTodo,deleteTodo} = require('../controllers/todo/todoControllers')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/todos', auth,createTodo)

router.get('/todo', auth,getToDo )

router.get('/todo/:id', auth,getTodoById )

router.patch('/todos/:id', auth, updateTodo)

router.delete('/todoDel/:id', auth,deleteTodo )

module.exports = router