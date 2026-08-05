from pydantic import BaseModel

from datetime import datetime


class HistoryResponse(BaseModel):

    id: int

    feature: str

    user_input: str

    ai_output: str

    created_at: datetime

    class Config:

        from_attributes = True