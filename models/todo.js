import mongoose  from 'mongoose'

const {Schema, model} = mongoose

const todoSchema = Schema({
   title: String,
   description: String,
   date_time: String,
   status: Boolean
},{
    strict: true
})

// named export
export const TodoModel = model('todo', todoSchema );