build:
	podman compose --env-file .env up --build
dev:
	podman compose --env-file .env up --watch
