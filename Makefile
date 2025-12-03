build:
	docker compose --env-file .env up --build
dev:
	docker compose --env-file .env up --watch
test:
	docker compose --env-file .env exec app bun test
