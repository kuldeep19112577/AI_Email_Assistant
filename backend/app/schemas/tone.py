from pydantic import BaseModel, Field


class ToneRequest(BaseModel):

    email: str = Field(..., min_length=10)

    tone: str = Field(..., min_length=3)


class ToneResponse(BaseModel):

    modified_email: str