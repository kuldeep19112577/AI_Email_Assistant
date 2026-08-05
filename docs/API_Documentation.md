# API Documentation

## Authentication

### POST /auth/signup

Register a new user.

### POST /auth/login

Login and receive JWT token.

### GET /auth/me

Returns logged in user information.

---

## Email

### POST /email/generate

Generate professional email.

---

## Rewrite

### POST /rewrite/

Rewrite existing email.

---

## Grammar

### POST /grammar/

Correct grammar.

---

## Tone

### POST /tone/

Change email tone.

---

## Compose

### POST /compose/

Compose an email from prompt.

---

## History

### GET /history/

Returns user email history.

---

Authentication

Protected APIs require

```
Authorization: Bearer <token>
```