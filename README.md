# homework-api

A Playwright + TypeScript API testing project for the [MockAPI Dog Todos API](https://mockapi.dog/en/mock-api-library/todos).

## What this project covers

This repo contains tests for:
- `GET /todos`
- `POST /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

## Stack

- Playwright
- TypeScript

## Project structure

```text
tests/
  todo-api.spec.ts
helpers/
  api_client.ts
fixtures/
  todo_payloads.ts
```

## Install

```bash
npm install
npx playwright install
```

## Run the tests

Run:
```bash
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

## Environment variables

If you use a `.env` file, add the API base URL there, for example:

```env
API_BASE_URL=https://your-mockapi-url
```
