const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user') 

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})
  
blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const user = req.user
  
  const requiredUser = await User.findById(user.id)
  
  const blog = new Blog({
    title: body.title,  
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: requiredUser._id
  })

  const savedBlog = await blog.save()
  requiredUser.blogs = requiredUser.blogs.concat(savedBlog._id)
  await requiredUser.save()
  
  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog/*, { new: true }*/)
  const updatedBlog = await Blog.findById(request.params.id)
  response.json(updatedBlog).end()
})

blogsRouter.delete('/:id', async (req, res) => {
  const user = req.user
 
  const blog = await Blog.findByIdAndRemove(req.params.id)

  if ( blog.user.toString() === user.id.toString() ) {
    await blog.remove()
    return res.status(204).end()
  } else {
    return res.status(400).json({ error: 'invalid token, impossible to delete blog'})
  }

  
})

module.exports = blogsRouter