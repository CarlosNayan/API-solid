# Gympass style app.

## 📦 Setup do Projeto

Antes de iniciar, certifique-se de ter o [Node.js](https://nodejs.org/), o [Yarn](https://yarnpkg.com/) e o [NestJS CLI](https://docs.nestjs.com/cli/overview) instalados.
Recomendo o uso do pacote nvm para gerenciamento de versões do node.
Adicione um **.env** ao projeto usando como base **.env.example**

| Script                       | Descrição                                       |
| ---------------------------- | ----------------------------------------------- |
| `npm install -g yarn`        | Instala todas as dependências do projeto        |
| `npm install -g @nestjs/cli` | Instala todas as dependências do projeto        |
| `yarn install`               | Instala todas as dependências do projeto        |
| `docker compose up -d`       | Inicia um container Docker com o **PostgreSQL** |

---

## 🐳 Docker

| Script                                                | Descrição                                |
| ----------------------------------------------------- | ---------------------------------------- |
| `docker build -t api-nest .`                          | Cria a imagem do projeto no **Docker**   |
| `docker images`                                       | Lista todas as imagens criadas no Docker |
| `docker export -o file.tar api-nest:latest`           | Exporta a imagem para um arquivo `.tar`  |
| `docker load -i api-image.tar`                        | Importa uma imagem do arquivo `.tar`     |
| `docker run -it --entrypoint /bin/sh api-nest:latest` | Inicia a imagem e abre um terminal Bash  |

---

## 🧪 Testes com **Jest**

| Script          | Descrição                                           |
| --------------- | --------------------------------------------------- |
| `yarn test`     | Executa todos os testes **sequencialmente**         |
| `yarn test:cov` | Executa os testes e gera relatório de **cobertura** |

## ✅ RF's (Functional Requirements | Requisitos Funcionais)

- [x] It must be possible to sign up;
- [x] It must be possible to authenticate;
- [x] It must be possible to retrieve the profile of a logged-in user;
- [x] It must be possible to retrieve the number of check-ins performed by the logged-in user;
- [x] It must be possible for the user to retrieve their check-in history;
- [x] It must be possible for the user to search for nearby gyms (less 10km);
- [x] It must be possible for the user to search for gyms by name;
- [x] It must be possible for the user to check in at a gym;
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym.

## ⚖️ RN's (Business Rules | Regras de Negócio)

- [x] The user must not be able to sign up with a duplicate email (already existing in the database);
- [x] The user cannot perform 2 check-ins on the same day;
- [x] The user cannot check in if not close (within 100m) to the gym;
- [x] The check-in can only be validated up to 20 minutes after being created;
- [x] The check-in can only be validated by administrators;
- [x] The gym can only be registered by administrators.

## 🛠️ RNF's (Non-Functional Requirements | Requisitos Não Funcionais)

- [x] The user's password needs to be encrypted;
- [x] The application data needs to be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [x] The user must be identified by a JSON Web Token (JWT).
