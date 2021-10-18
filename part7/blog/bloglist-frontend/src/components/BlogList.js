import React from 'react'
import { useSelector } from 'react-redux'
import {
  List,
  ListItemText,
  Box,
  ListItem
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const BlogList = ( { username }) => {
  const blogs = useSelector(state => state.blogs)

  return blogs.sort((a,b) => b.likes-a.likes).map(blog =>
    <BlogItem key={blog.id} blog={blog} username={username}/>
  )
}

const BlogItem = ({ blog, username }) => {
  if (username) {
    console.log(username, blog)
  }

  return (
    <Box>
      <List>
        <ListItem divider button component={Link} to={`/blogs/${blog.id}`}>
          <ListItemText primary={`${blog.title} | ${blog.author}`}/>
        </ListItem>
      </List>
    </Box>
  )

}


export default BlogList
