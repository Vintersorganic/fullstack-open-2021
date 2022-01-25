import React, { useState } from 'react'

const Books = ({filteredGenres,  books, show }) => {
  const [genre, setGenre] = useState('all genres');

  let filteredBooks = books

  if (!show) {
    return null
  }

  

  if (genre === 'all genres') {
    filteredBooks = books
  } else {
    filteredBooks = filteredBooks.filter(book => book.genres.includes(genre))
  }

  console.log(filteredBooks);

  return (
    <div>
      <h2>books</h2>

      <p>in genre <b>{genre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        { filteredGenres.map(genre => 
          (<button key={genre} onClick={() => setGenre(genre)}>{genre}</button>)
        )}
      </div>
    </div>
  )
}

export default Books