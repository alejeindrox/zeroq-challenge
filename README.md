# ZeroQ Challenge API in NestJS 10
![License](https://img.shields.io/badge/License-MIT-8fbe1a?labelColor=5c5c5d&style=flat)
![Node](https://img.shields.io/badge/Node-%3E=%20v18.0.0-2282c3?labelColor=5c5c5d&style=flat)
![pnpm](https://img.shields.io/badge/pnpm-%3E=%20v7.8.0-50c62a?labelColor=5c5c5d&style=flat)
![docker](https://img.shields.io/badge/docker-%3E=%20v20-f84d62?labelColor=5c5c5d&style=flat)
![author](https://img.shields.io/badge/author-@alejeindrox-49b382?labelColor=5c5c5d&style=flat)


## 1. Getting started

### 1.1 Requirements
Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/)
- if you do not have pnpm installed, please check the documentation: [pnpm](https://pnpm.io/es/installation)
- It's useful for advanced testing and image building, although it is not required for development: [Docker](https://www.docker.com/)

### 1.2 Project configuration
Start by cloning this project on your workstation.

``` sh
$ git clone https://github.com/alejeindrox/zeroq-challenge.git zeroq
```

The next thing will be to install all the dependencies of the project.

```sh
$ cd ./zeroq
$ pnpm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing your environment variables used for development.

```sh
$ cp .env.example .env
$ vi .env
```

### 1.3 Launch and discover
You are now ready to launch the NestJS application using the command below.

```sh
# If you are using docker, run database to start services like mongo and redis and nestjs.
$ docker-compose up -d

# Launch the development server with TSNode (in case that you want only the nestJS App).
$ pnpm run start
```

## 2. Project structure

```sh
└── 📁src
    └── app.controller.spec.ts
    └── app.controller.ts
    └── app.module.ts
    └── app.service.ts
    └── 📁auth
        └── auth.controller.spec.ts
        └── auth.controller.ts
        └── auth.module.ts
        └── auth.service.spec.ts
        └── auth.service.ts
        └── 📁dto
            └── login-auth.dto.ts
            └── register-auth.dto.ts
        └── 📁strategy
            └── jwt.strategy.ts
        └── 📁utils
            └── handleBcrypt.ts
            └── jwt-handle.spec.ts
            └── jwt-handle.ts
    └── 📁database
        └── database.module.ts
    └── 📁guards
        └── jwt-guard.guard.spec.ts
        └── jwt-guard.guard.ts
    └── main.ts
    └── 📁schemas
        └── user.model.ts
```

## 3. Project goals

The goal of this project is to provide a REST API project built with NestJS for a ZeroQ Challenge.

## 4. Roadmap

The following improvements are currently in progress : 

### Requisitos

- [x] El servicio tiene un endpoint que crea el usuario.
- [x] Un endpoint que con sus credenciales crea un token con un ttl de 30 min.
- [x] Un nuevo endpoint que utiliza refresca el token anterior. Para el token antiguo si tiene ttl debe persistirse en una blacklist en redis para no permitir ejecutar operaciones.
- [x] Un endpoint que retorna un string cualquiera que requiera un token para validar el flujo.

### Consideraciones:

- [x] Asumir que la contraparte técnica no cuenta con el ambiente, por lo cual, debe proveer un Docker para todos los componentes de su proyecto.
- [x] Se valorarán buenas prácticas de desarrollo.
- [x] Se valorarán pruebas e2e y test unitarios a los servicios que apliquen.
- [x] Se requiere un entregable en postman para validar todo su flujo y/o swagger.
- [x] Utilizar nestjs, mongodb y redis para el desarrollo

## 5. Resources

### 5.1 Hosts
- API: [http://localhost:3000/v1/](http://localhost:3000/v1/)
- API Documentation (Swagger): [http://localhost:3000/documentation](http://localhost:3000/documentation)
- Mongo-Express: [http://localhost:8082](http://localhost:8082)
- Redis-Comander: [http://localhost:8081](http://localhost:8081)
