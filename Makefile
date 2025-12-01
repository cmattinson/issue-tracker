build:
	docker compose --env-file .env up --build
dev:
	docker compose --env-file .env up --watch
