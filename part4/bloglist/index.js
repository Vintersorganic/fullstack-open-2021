const http = require('http')
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')


const mongoUrl = 'mongodb+srv://varulvsnatt:varulvsnatt@cluster0.m2aur.mongodb.net/bloglist-app?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)
  .then(result => {
      console.log("connected to MongoDB");
  })
  .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
  })


app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (req, res) => {
    const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    })

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
