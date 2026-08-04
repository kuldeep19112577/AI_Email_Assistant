from pydantic import BaseModel, EmailStr


class SignupModel(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    
from sqlalchemy import Column, Integer, String, TIMESTAMP, func

from app.database.connection import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False, index=True)

    password = Column(String(255), nullable=False)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )