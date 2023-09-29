const app = require('./app')
const port = process.env.PORT 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 7000000 
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('file must be a doc'))
//         }
//         cb(undefined, true)

//     //     cb(new Error('file must be a pdf'))
//     //     cb(undefined, true)
//     //     cb(undefined, false)
//      }
// })



// app.post('/upload', upload.single('upload'), (req, res)=>{
//     res.send()
// })
// // app.use((req, res, next) => {
// //     if (req.method === 'GET') {
// //         res.send('GET requests are disabled')
// //     } else {
// //         next()
// //     }
// // })

// // app.use((req, res, next) => {
// //     res.status(503).send('Site is currently down. Check back soon!')
// // })




// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5c2e505a3253e18a43e612e6')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5c2e4dcb5eac678a23725b5b')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()