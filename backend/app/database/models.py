from pydantic import BaseModel, EmailStr

from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    Text,
    TIMESTAMP,
    func,
)
from sqlalchemy.orm import relationship

from app.database.connection import Base


# -----------------------------
# Pydantic Model
# -----------------------------

class SignupModel(BaseModel):

    full_name: str

    email: EmailStr

    password: str


# -----------------------------
# User Table
# -----------------------------

class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    full_name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(100),
        unique=True,
        nullable=False,
        index=True
    )

    password = Column(
        String(255),
        nullable=False
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    history = relationship(
        "EmailHistory",
        backref="user"
    )


# -----------------------------
# Email History Table
# -----------------------------

class EmailHistory(Base):

    __tablename__ = "email_history"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    feature = Column(
        String(50),
        nullable=False
    )

    user_input = Column(
        Text,
        nullable=False
    )

    ai_output = Column(
        Text,
        nullable=False
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )