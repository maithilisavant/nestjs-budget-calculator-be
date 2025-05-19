# NestJS Budget Calculator API

A RESTful API for a Budget Calculator application built with NestJS, TypeORM, and Auth0 integration.

## Features

- User authentication with Auth0
- Budget item management (income and expenses)
- RESTful API endpoints
- PostgreSQL database integration
- Swagger API documentation

## Prerequisites

- Node.js (v16+)
- PostgreSQL
- Auth0 account

## Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/nestjs-budget-calculator.git
cd nestjs-budget-calculator
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Create a `.env` file based on `.env.example` and fill in your configuration:

\`\`\`
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_DATABASE=budget_calculator
DB_SYNCHRONIZE=true

# Auth0
AUTH0_ISSUER_URL=https://your-tenant.auth0.com/
AUTH0_AUDIENCE=https://your-api-identifier/
\`\`\`

## Running the app

\`\`\`bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
\`\`\`

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

\`\`\`
http://localhost:3000/api
\`\`\`

## Auth0 Setup

1. Create a new API in your Auth0 dashboard
2. Set the identifier (this will be your `AUTH0_AUDIENCE`)
3. Enable RBAC and Add Permissions in the Access Token
4. Create a new application (Single Page Application for your frontend)
5. Configure the callback URLs and allowed origins

## Project Structure

\`\`\`
src/
├── auth/                 # Auth0 authentication
├── budget-items/         # Budget items module
├── users/                # Users module
├── app.module.ts         # Main application module
└── main.ts               # Application entry point
\`\`\`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
