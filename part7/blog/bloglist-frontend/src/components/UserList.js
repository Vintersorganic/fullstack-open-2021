import React from 'react'
import { useSelector,  } from 'react-redux'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from '@material-ui/core'
import { Link } from 'react-router-dom'


const UserList = () => {

  const users = useSelector(state => state.users)

  if (!users ) {
    return null
  }

  else return (
    <Container>
      <h1 align='center'>User List</h1>
      <TableContainer component={Paper}>
        <Table >
          <TableHead style={{ backgroundColor: '#42a5f5' }}>
            <TableRow >
              <TableCell align='center'>Users</TableCell>
              <TableCell align='center'>Number of blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: '#e3f2fd' }}>
            {users.map(user =>
              <TableRow key={user.id} >
                <TableCell align='center' component={Link} to={`/users/${user.id}`}>
                  {user.name}
                </TableCell>
                <TableCell align='center'>{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
  )
}

export default UserList
