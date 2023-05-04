DOCKER_COMPOSE_FILE = docker-compose.yml
DOCKER_COMPOSE_CMD = docker-compose -f $(DOCKER_COMPOSE_FILE)

.PHONY: run build up down clean logs backend-shell frontend-shell run-test

run:
	@npm ci
	@make clean
	@make build
	@make up

build:
	@echo "Building backend image..."
	@docker build -t myapp-backend ./backend
	@echo "Building frontend image..."
	@docker build -t myapp-frontend ./frontend

up:
	@echo "Starting application..."
	@$(DOCKER_COMPOSE_CMD) up -d

down:
	@echo "Stopping application..."
	@$(DOCKER_COMPOSE_CMD) down

clean:
	@echo "Removing containers..."
	@$(DOCKER_COMPOSE_CMD) down --rmi all --volumes --remove-orphans
	@echo "Removing images..."
	@docker image prune -f

logs:
	@echo "Displaying logs..."
	@$(DOCKER_COMPOSE_CMD) logs -f

backend-shell:
	@echo "Connecting to backend container..."
	@$(DOCKER_COMPOSE_CMD) exec backend sh

frontend-shell:
	@echo "Connecting to frontend container..."
	@$(DOCKER_COMPOSE_CMD) exec frontend sh

tests:
	@npm ci --prefix backend
	@npm ci --prefix frontend
	@npm test --prefix backend
	@npm test --prefix frontend

e2e-tests:
	@make run
	@npm ci
	@npm run test-e2e
