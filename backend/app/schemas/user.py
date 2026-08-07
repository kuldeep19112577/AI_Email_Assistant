from pydantic import BaseModel, EmailStr, Field

class SignupRequest(BaseModel):

    full_name: str = Field(
        min_length=3,
        max_length=100,
        description="User Full Name"
    )

    email: EmailStr

    password: str = Field(
        min_length=8,
        max_length=16,
        description="Password must be between 8 and 16 characters"
    )
from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str