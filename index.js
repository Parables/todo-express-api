
import express from 'express'
import mongoose from 'mongoose'
import { TodoModel } from './models/todo.js'

const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.send("Welcome to our API")
})
app.get('/todos', (req, res) => {
    TodoModel.find({}).then(todos => res.json(todos)
    ).catch(error => {
        console.log('Something went wrong:', error)
        res.json([])
    })
})

/* app.get('/todos',async (req, res) => {
   const todos = await TodoModel.find({})
    res.json(todos)
})
 */

app.post('/todos', (req, res) => {
    console.log(req.body)
    TodoModel.create({ ...req.body }, function (error, newTodo) {
        if (error) return res.status(400).send(`Something went wrong: ${error}`)
        return res.json(newTodo);
    })
})

app.patch('/todos/:id', (req, res) => {
    TodoModel.findByIdAndUpdate(req.params.id, req.body, {}, (error, updatedTodo) => {
        if (error) console.log('Something went wrong', error)
        return res.json(updatedTodo)
    })
})

app.delete('/todos/:id', (req, res) => {
    TodoModel.findByIdAndDelete(req.params.id, {}, (error, deletedTodo) => {
        if (error) console.log('Something went wrong', error)
        return res.json(deletedTodo)
    })
})


const conString = "mongodb+srv://db_admin:admin1234@cluster0.8jjwf.mongodb.net/todo_db?retryWrites=true&w=majority"
// const conString = "mongodb://localhost/todo_db"

app.listen(5005, () => {
    console.log('Server is up and running 🚀🚀🚀')
})

// option 1
mongoose.connect(conString).then(() => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('Something went wrong: ', error)

});



// option 2
/* async function startServer(){
    try {
        await mongoose.connect(conString)


    } catch (error) {
        console.log('Something went wrong: ', error)
    }
}

startServer(); */