# Serverside notes

First time running? Run `npm install`

# File Architecture

- config: database instanciation
- models: structure of database relations
- resolvers: manage all Query and Mutations (similar to HTTP Methods)
- schema: specifies the different graphql types
- index.js: server instance
- reset_db.sql: Creates required tables; included test entries.

# Debug Notes

- Fix issue with SequelizeConnectionError:
  https://stackoverflow.com/questions/61350186/how-to-solve-the-database-connection-error-sequelizeconnectionerror
