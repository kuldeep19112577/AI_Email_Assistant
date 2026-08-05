from pydantic import BaseModel, Field


class ComposeRequest(BaseModel):

    prompt: str = Field(..., min_length=10)


class ComposeResponse(BaseModel):

    email: str