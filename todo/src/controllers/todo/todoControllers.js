const Todo = require('../../models/todo')

const createTodo =  async (req, res) => {
    const todo = new Todo({
        ...req.body,
        owner: req.user._id
    })

    try {
        await todo.save()
        res.status(201).send(todo)
    } catch (e) {
        res.status(400).send(e)
    }
}

/**
 * pagination for the get method 
 * /todo?limit=1&skip=10
 */
const getToDo = async (req, res) => {
    const match = {}
    const sort ={}


    if(req.query.completed){
        match.completed = req.query.completed =='true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]]= parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const page = Number(req.query.page) *1 || 1;
        // const limit =Number(req.query.limit)*1 || 1;
        // const skip = (page-1)*limit

        await req.user.populate({
            path:'todos',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.todos)
    } catch (e) {
        res.status(500).send()
    }
}
const getTodoById = async (req, res) => {
    const _id = req.params.id

    try {
        const todo = await Todo.findOne({ _id, owner: req.user._id })

        if (!todo) {
            return res.status(404).send()
        }

        res.send(todo)
    } catch (e) {
        res.status(500).send()
    }
}

const updateTodo = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const todo = await Todo.findOne({ _id: req.params.id, owner: req.user._id})

        if (!todo) {
            return res.status(404).send()
        }

        updates.forEach((update) => todo[update] = req.body[update])
        await todo.save()
        res.send(todo)
    } catch (e) {
        res.status(400).send(e)
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!todo) {
            res.status(404).send()
        }

        res.send(todo)
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    createTodo,
    getToDo,
    getTodoById,
    updateTodo,
    deleteTodo
}