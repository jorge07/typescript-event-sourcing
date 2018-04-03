service=api

export service

.PHONY: build # Build containers
build:
	docker-compose build

.PHONY: install # Install Api depencencies
install:
	docker-compose run --rm api sh -lc 'yarn install'

.PHONY: dev
dev:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose down

.PHONY: logs
logs:
	docker-compose logs -f $(service)

.PHONY: start
start: start-deps
	yarn dev

.PHONY: start-deps
start-deps:
	docker-compose up -d rmq kibana elasticsearch redis

.PHONY: start-workers
start-workers:
	yarn start-workers
