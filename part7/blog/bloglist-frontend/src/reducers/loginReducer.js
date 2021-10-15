import loginService from "../services/login"
import blogService from "../services/blogs"

const loginReducer = (state = null, action) => {
  switch(action.type) {
  case('SET_USER'):
    return action.data
  default:
    return state
  }
}


export const login = (user) => {
  return async dispatch => {
    try {
      
    } catch (e) {
      return e
    }
  }
}



export default loginReducer