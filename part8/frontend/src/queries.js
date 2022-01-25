import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
    published
    genres
    
    }
  }
`;

export const CREATE_BOOK = gql `
mutation AddBook($title: String!, $published: Int!, $genres: [String!]!, $author: String!) {
  addBook(title: $title, published: $published, genres: $genres, author: $author) {
    title
    genres
    published
  }
}
`

export const EDIT_BORNYEAR = gql `
mutation ($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME =  gql `
  query Query {
  me {
    username
    favoriteGenre
  }
}

`
