# Serverside notes

First time running? Run `npm install`

# File Architecture

- config: database instanciation
- models: structure of database relations
- resolvers: manage all Query and Mutations (similar to HTTP Methods)
- schema: specifies the different graphql types
- index.js: server instance
- reset_db.sql: Creates required tables; included test entries.

# Debug/Research Notes

- apollo-server's context object is accessible at every level (use for db conn, data fetchers, user info)
- Update heroku repo: "git push heroku master
- Don't forget to add all .env variables into heroku app's setting config variables.
- Fix issue with SequelizeConnectionError:
  https://stackoverflow.com/questions/61350186/how-to-solve-the-database-connection-error-sequelizeconnectionerror
