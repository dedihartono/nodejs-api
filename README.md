<h1 align="center">
  <strong>NODE JS - API (SIMPLE EXAMPLE)</strong>
</h1>
<p align="center">
  <a href="https://app.travis-ci.com/dedihartono/nodejs-api">
    <img src="https://app.travis-ci.com/dedihartono/nodejs-api.svg?token=s7hU2xDjMW6hcGzAyGYq&branch=main" alt="Build Status">
  </a>
</p>

# Development (Local Dev)

**Migrations**

- `npx sequelize-cli db:migrate`
- `npx sequelize-cli db:seed:all`
- Details: [Sequelize Help](/docs/SEQUELIZE-HELP.md)

**Running app**

- `npm install`
- `npm run dev`
- Details: [Developer Tools](/docs/DEVELOPER-TOOLS.md)

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

## Additional Information

- [Contributing Guidelines](/docs/CONTRIBUTING.md)
- [Change Log](/CHANGELOG.md)
