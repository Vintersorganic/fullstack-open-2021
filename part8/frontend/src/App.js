import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from './components/Login'
import { useApolloClient, useQuery, useSubscription  } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED} from "./queries";
import Recommended from "./components/Recommended";


const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const allAuthorsResult = useQuery(ALL_AUTHORS);
  const allBooksResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME)

  const client = useApolloClient()

  

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log(dataInStore);
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
      window.alert(`Books list updated with new book: ${addedBook.title}`)
      updateCacheWith(addedBook)
    }
  })

  if (allAuthorsResult.loading || allBooksResult.loading )  {
    return <div>loading...</div>
  }

  console.log(userResult);

  const genresArray = [].concat.apply([], allBooksResult.data.allBooks.map(book => book.genres))
  const filteredGenres = ['all genres']
  for (const genre of genresArray) {
      if (!(filteredGenres.includes(genre))) {
        filteredGenres.push(genre)
    }
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

 
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? <button onClick={() => setPage("add")}>add book</button> : null}
        {token ? <button onClick={() => setPage("recommended")}>recommended</button> : null}
        {token ? <button onClick={logout}>logout</button> : <button onClick={() => setPage("login")}>login</button>}
      </div>
      <Notify errorMessage={errorMessage} />

       <Authors token={token} show={page === "authors"} authors={allAuthorsResult.data.allAuthors} setError={notify}/> 

      <Books filteredGenres={filteredGenres} show={page === "books"} books={allBooksResult.data.allBooks}/>

      <NewBook show={page === "add"} setError={notify}/>
      <Login show={page === "login"} setPage={setPage} setError={notify} setToken={setToken}/>
      {console.log(userResult)}
      {userResult ? <Recommended show={page === 'recommended'} setPage={setPage} books={allBooksResult.data.allBooks} user={userResult.data}/> : null}
    </div>
  );
};

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App;
