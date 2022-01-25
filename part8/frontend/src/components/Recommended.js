import React from 'react';

const Recommended = ({books, user, show }) => {

  let filteredBooks = books.filter(book => book.genres.includes(user.me.favoriteGenre))

  

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre <b>{user.me.favoriteGenre}</b></p>

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
      
    </div>
  )
}

export default Recommended;
