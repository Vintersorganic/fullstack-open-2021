import React from "react"
import  { useField } from '../hooks' 
import { useHistory } from "react-router"

const CreateNew = (props) => {
    // const [content, setContent] = useState('')
    // const [author, setAuthor] = useState('')
    // const [info, setInfo] = useState('')
    const history = useHistory()
    const {reset: resetContent, ...content} = useField('text')
    const {reset: resetAuthor, ...author} = useField('text')
    const {reset: resetInfo, ...info} = useField('text')
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      history.push('/')
    }
  
    const handleReset = () => {
      resetContent();
      resetAuthor();
      resetInfo();
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name="content" {...content} />
          </div>
          <div>
            author
            <input name="author" {...author} />
          </div>
          <div>
            url for more info
            <input name="info" {...info} />
          </div>
          <button type='submit'>create</button>
          <button type='reset' onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew