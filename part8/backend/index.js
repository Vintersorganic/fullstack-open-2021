const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { v1: uuid } = require("uuid");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/User");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const MONGODB_URI =
  "mongodb+srv://varulvsnatt:varulvsnatt@cluster0.m2aur.mongodb.net/graphqlpt8?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });



/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
 */


const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genre)
        );
      } else if (args.author) {
        return await Book.find({ author: args.author });
      } else if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } });
      } else {
        return Book.find({});
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      console.log(context, 'CONTEXT');
      return context.currentUser
    }
  },
  Author: {
    bookCount: (root) => {
      return books.reduce((acc, book) => {
        if (book.author === root.name) acc += 1;

        return acc;
      }, 0);
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({
          name: args.author,
        });
      }
      try {
        await author.save();
      } catch (e) {
        console.log(e);
      }

      let book = new Book({ ...args, author: author._id });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return book.save();
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      try {
        let updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        );
        console.log(updatedAuthor);
        return updatedAuthor;
      } catch (e) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre})
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }

});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
