r:
	npm run dev -- --host

build:
	docker compose down
	@if [ ! -z "$(shell docker images -q student-schedule__client-client)" ]; then \
		docker rmi student-schedule__client-client; \
		fi
	docker compose up --build