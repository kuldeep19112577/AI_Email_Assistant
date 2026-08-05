# AI_Email_Assistant

AI Email Assistant is a full-stack web application that uses Google's Gemini AI to generate and improve professional emails.

## Features

- User Authentication (JWT)
- Generate Professional Emails
- Rewrite Emails
- Grammar Checker
- Tone Changer
- Compose Emails from Prompts
- Email History
- MySQL Database
- REST API using FastAPI
- Responsive Frontend
- Automated Testing

## Technologies Used

### Backend
- Python
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication
- Google Gemini API

### Frontend
- HTML
- CSS
- JavaScript

### Testing
- Pytest
- Pytest-Cov

## Installation

```bash
git clone <repository>

cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

## API Documentation

Open

```
http://127.0.0.1:8000/docs
```

## Test Project

```bash
python -m pytest
```

Coverage

```bash
python -m pytest --cov=app --cov-report=term-missing
```

Current Coverage

```
91%
```

Tests Passed

```
15 Passed
```

---

## Project Structure

```
backend/
    app/
        api/
        database/
        prompts/
        schemas/
        services/
        utils/
frontend/
docs/
tests/
```

---

## Future Improvements

- Email Templates
- Attachments
- User Profiles
- Admin Dashboard
- Export History