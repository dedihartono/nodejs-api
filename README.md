[![Build Status](https://app.travis-ci.com/dedihartono/nodejs-api.svg?token=s7hU2xDjMW6hcGzAyGYq&branch=main)](https://app.travis-ci.com/dedihartono/nodejs-api)

# Development (Local Dev)

- `npm install`
- `npm run dev`

---

# Build project and Run use pm2

- `npm run build`
- `npm install -g pm2`
- `pm2 start ecosystem.config.js --env production`

---

# Docker Compose

**Dev - Staging**

- `docker compose -f docker-compose.dev.yml -p project-dev  up --build -d`

**Production**

- `docker compose -f docker-compose.prod.yml -p project-prod up --build -d`

Note:
if network has't created yet.

- `docker network create project-dev-network`
- `docker network create project-prod-network`
