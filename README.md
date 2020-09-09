# Serverside notes

First time running? Run `npm install`

# TODO:

- [x] All users will be able to search for any photo based on username
- [x] All users will be able to search for registered photographer accounts.
- [ ] NEXT: All users will be able to search for any photo based on tags
- [ ] All users will be able to sort their searches by time, popularity, relevance
- [ ] All users will be able to view another photographer's page.
- [x] Non-authenticated users will be able to create an account.
- [x] Authenticated users will be able to add a single photo(s) to their page.
- [x] Authenticated users will be able to delete a single photo(s) to their page.
- [ ] Authenticated users will be able to move around photos in their page.
- [ ] NEXT: Authenticated users will be able to like photos.
- [ ] LOW: Authenticated users will be able to follow photographers.

# File Architecture

- config: database instanciation
- models: structure of database relations
- resolvers: manage all Query and Mutations (similar to HTTP Methods)
- schema: specifies the different graphql types
- index.js: server instance
- reset_db.sql: Creates required tables; included test entries.

# Debug/Research Notes

- (?) When querying with mutations, the Typedef return will be a subset of the respective model:
  - Example: PhotoModel has fields {id, owner, filepath}. That means the query/mutation will at most return
    those 3 fields.
- Authentication issue: no req.headers.authentication upon request
- apollo-server's context object is accessible at every level (use for db conn, data fetchers, user info)
- Update heroku repo: "git push heroku master
- Don't forget to add all .env variables into heroku app's setting config variables.
- Fix issue with SequelizeConnectionError:
  https://stackoverflow.com/questions/61350186/how-to-solve-the-database-connection-error-sequelizeconnectionerror
- Even if the column name in the database is camel cased, sequelize has to read the model file with lowercased column names or else a fat error
