from pydantic import BaseModel,ConfigDict
from pydantic import BaseModel, ConfigDict

from datetime import datetime


class HistoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int

    feature: str

    user_input: str

    ai_output: str

    created_at: datetime

