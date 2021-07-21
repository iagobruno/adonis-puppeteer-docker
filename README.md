# discussions-forum

## Stack

- [AdonisJS 5](https://adonisjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Webpack](https://webpack.js.org/)
- [Puppeteer](https://pptr.dev/)

#### About AdonisJS

Adonis is a MVC web framework for Node.js based on other big famous frameworks like Laravel and Rails. It includes everything you need to create a fully functional web app or an API server. [Learn more](https://adonisjs.com/).

## Setup

```bash
> git clone https://github.com/iagobruno/discussions-forum.git forum
> cd forum
> yarn install
> copy .env.example .env # And edit the values
> node ace generate:key # Copy and paste into APP_KEY in .env file
> node ace migration:run
> node ace db:seed # (optional) If you want to populate database with fake data.
> node ace serve --watch
```

Then open http://localhost:3333/ in your browser.

#### Using Docker:

```bash
> docker-compose up -d --build
> docker logs node-container --follow
> docker exec -it node-container /bin/sh
```

## Ace commands

Ace is a command-line framework embedded into the core of AdonisJS to do things like start the server or run database migrations. [Learn more](https://docs.adonisjs.com/guides/ace-commandline).

- `node ace serve --watch`: Start server in development mode, along with the file watcher. Also starts the webpack dev server to compile front-end assets.
- `node ace make:controller <NAME>`: Make a new HTTP controller into app/Controllers/Http folder.
- `node ace make:model <NAME>`: Make a new Lucid model into app/Models folder.
- `node ace make:migration <NAME>`: Make a new database migration file into database/migrations folder.
- `node ace migration:run`: Run all pending database migrations.
- `node ace migration:rollback`: Rollback last executed migrations.
- `node ace migration:rollback --batch 0`: Rollback all database migrations.
- `node ace db:seed`: Populate database with fake data.

Run `node ace --help` to see more.

## Running tests

To run tests, run one of the following commands:

```bash
# Run all tests
> yarn run test

# Run only one test file
> yarn run test auth.spec.ts

# Run all tests on every file change
> yarn run test-watch

# Run only one test file on every file change
> yarn run test-watch auth.spec.ts
```

Running inside Docker container:

```bash
> docker exec -i node-container yarn run test
```

> TIP: You can create a `.env.testing` file at the project root to define/change variables that will only be used during testing.

<details>
  <summary>How to create a Postgres container to run tests</summary>

  ```bash
  # Create a postgres container
  > docker run -d --name postgres-container -p 6789:5432 -e POSTGRES_PASSWORD=1234 postgres:13-alpine
  # Create a docker netwotk
  > docker network create pg-network
  # Connect the containers to allow node-container access postgres-container
  > docker network connect pg-network node-container && docker network connect pg-network postgres-container
  ```

  Then create/change the .env.testing file with these values:

  ```env
  NODE_ENV=testing

  DB_CONNECTION=pg
  PG_HOST=postgres-container
  PG_PORT=5432
  PG_USER=postgres
  PG_PASSWORD=1234
  PG_DB_NAME=postgres
  ```
</details>

## Deployment

This project can be deployed to any cloud service that supports Docker.

Run the following command to create a container with production build version.

```bash
> docker-compose up -d --build
```

**OBS**: The `NODE_ENV` environment variable is important to define which version of the app will run. Define it in your environment.
