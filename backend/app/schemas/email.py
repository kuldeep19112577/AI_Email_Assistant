from pydantic import BaseModel, Field


class EmailRequest(BaseModel):
    email_type: str = Field(..., min_length=2)
    recipient: str = Field(..., min_length=2)
    tone: str = Field(..., min_length=2)
    purpose: str = Field(..., min_length=5)


class EmailResponse(BaseModel):
    generated_email: str