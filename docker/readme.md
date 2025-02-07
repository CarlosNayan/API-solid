## Passos para bota o cluster swarm no ar

1 - Configure os containers responsáveis pelo monitoramento

2 - docker network create --driver=overlay backend-network (opicional. Fazer apenas se rodando o banco na mesma maquina)

3 - export $(grep -v '^#' .env | xargs) >> Para pegar as variáveis de ambiente

4 - docker stack deploy -c docker-compose/api/docker-compose.yml api-nest --detach=false >> para subir a aplicação

5 - docker service ps api-nest_nest_app >> Lista os serviços

6 - docker service scale api-nest_nest_app=4 >> Para escalar o serviço

---

## Passos para remover o cluster swarm

1 - docker stack rm api-nest >> Para remover a aplicação

2 - docker stack rm api-nest-database

3 - docker stack rm api-nest-storage
