from pydantic import BaseModel, Field


class GrammarRequest(BaseModel):
    text: str = Field(..., min_length=10)


class GrammarResponse(BaseModel):
    corrected_text: str