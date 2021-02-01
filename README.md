# Agreement Price Application

This project is a job application task for junior developer position at Aktia. The full-stack project is implemented with Postgresql, Sequelize ORM, Node.js, Hapi, React, React-Table, styled components, Axios and coded in Typescript.

## Task Reflection

Implemented functionalities:

- Listing all customers and their info
- Listing customer agreements and service, with sum of service fee
- Updating service fee through UI
- CRUD functionalities api endpoints for all entities
- Version controlled database schema
- ORM layer for using database tables
- Basic unit tests for frontend
- Unit/integration tests for backend (hapi & postgres integration)
- Shared typing between frontend and backend

Improvement ideas and reflection:

- I spent a bit too much time on backend, and had to skip UI styling almost entirely
- Similarly, UI code and typing should be tidied up.
- The rest of CRUD functionalities could easily be added to the front end
- Test coverage could be improved

## UI

![UI example](/example.png)

## Developement

### Dependencies

- Postgres (v10)
- Node.js
- Yarn

### Development environment setup

To install modules, and initialize the database, run:

```
./setup.sh
```

### Testing

```
yarn test #  for running all tests
yarn test-frontend # for running frontend tests
yarn test-backend # for running backend tests
```

### Database migrations

The database schema is version controlled together with the code. To create or edit tables:

```
yarn sequelize migration:create --name migration-name

# edit migration file, then
yarn sequelize db:migrate
```

### Running development environment

```
yarn start-frontend
NODE_ENV=test yarn start-backend # test environment has prepopulated data
```
