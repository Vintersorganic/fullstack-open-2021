import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  case 'INCREASE_LIKES':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.destroy(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
    } catch (e) {
      dispatch(setNotification('Cannot delete blog!', 3))
    }
  }
}

export const blogUpdate = (blog) => {
  console.log({ ...blog, likes: blog.likes + 1 }, 'reducer blog')
  return async dispatch => {
    const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
    console.log(updatedBlog, 'updatedblog')
    dispatch({
      type: 'INCREASE_LIKES',
      data: updatedBlog
    })
  }
}

export default blogReducer