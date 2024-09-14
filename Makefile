SERVICE_NAME = web
DOCKER_COMPOSE = docker-compose

build:
	@echo "Construindo a imagem Docker..."
	$(DOCKER_COMPOSE) build
	@echo "Imagem Docker construída com sucesso."

up:
	@echo "Iniciando o contêiner..."
	$(DOCKER_COMPOSE) up -d
	@echo "Contêiner iniciado."

down:
	@echo "Parando e removendo o contêiner..."
	$(DOCKER_COMPOSE) down
	@echo "Contêiner parado e removido."

rebuild: build down up

logs:
	@echo "Visualizando logs do contêiner..."
	$(DOCKER_COMPOSE) logs -f

clean:
	@echo "Limpando contêineres, redes e volumes..."
	$(DOCKER_COMPOSE) down --volumes --remove-orphans
	@echo "Recursos limpos."

.PHONY: build up down rebuild logs clean