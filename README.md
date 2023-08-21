# bolsiyo-tech-challenge

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Levantar el proyecto

El siguiente comando levantara una base de datos, ejecutara las migraciones y ejecutara el dockerfile del proyecto, el cual sera expuesto en el puerto 8080. El servicio tardara un poco en estabilizarse ya que necesita que la base de datos este arriba y con las migraciones listas.

```
docker-compose up
```

aqui hay un token para probar los endpoints, todos menos el /auth/login/ y /ping necesitan un header de Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJvbHNpeW8uY29tIiwiY29tcGFueUlkIjoiMGFjNGEyYjUtNzhiNS00Y2YwLWI3YTItODE0NDg4NWYwMWY0IiwiaWF0IjoxNjkyNjUzOTQ0LCJleHAiOjE2OTUyNDU5NDR9.aijQV3zlEPlbxl8RauU3IeoE2SKct-ZmzWgoUTvQ70A

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
yarn install
```

To only install resolved dependencies in `package-lock.json`:

```sh
yarn ci
```

## Run the application

```sh
yarn start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
yarn build
```

To force a full build by cleaning up cached artifacts:

```sh
yarn rebuild
```

## Fix code style and formatting issues

```sh
yarn lint
```

To automatically fix such issues:

```sh
yarn lint:fix
```

## Other useful commands

- `yarn migrate`: Migrate database schemas for models
- `yarn openapi-spec`: Generate OpenAPI spec into a file
- `yarn docker:build`: Build a Docker image for this application
- `yarn docker:run`: Run this application inside a Docker container

## Tests

```sh
npm test
```

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
