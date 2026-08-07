from pydantic import BaseModel, Field


class RewriteRequest(BaseModel):
    original_email: str = Field(..., min_length=10)
    instruction: str = Field(..., min_length=3)


class RewriteResponse(BaseModel):
    rewritten_email: str