import React from 'react'
import { Container,List,
  ListItemText,
  Box,
  ListItem } from '@material-ui/core'

const UserInfo = ( { selectedUser }) => {

  if (!selectedUser) {
    return null
  }

  return (
    <Container>
      <h1 align='center'>{ selectedUser.name }</h1>
      <h3> Added blogs: </h3>
      { console.log(selectedUser)}
      <Box>
        <List>
          { selectedUser.blogs.map(blog =>
            <ListItem key={blog.id} divider button>
              <ListItemText>{blog.title}</ListItemText>
            </ListItem>
          )}
        </List>
      </Box>
    </Container>
  )
}

export default UserInfo
