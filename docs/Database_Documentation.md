# Database Documentation

Database

```
ai_email_assistant
```

---

## users

| Column | Type |
|---------|------|
| id | INT |
| full_name | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |
| created_at | TIMESTAMP |

---

## email_history

| Column | Type |
|---------|------|
| id | INT |
| user_id | INT |
| feature | VARCHAR |
| user_input | TEXT |
| ai_output | TEXT |
| created_at | TIMESTAMP |

---

Relationship

```
users (1)
      |
      |
      |----< email_history (many)
```