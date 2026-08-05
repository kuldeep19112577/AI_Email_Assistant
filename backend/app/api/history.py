from typing import List

from fastapi import APIRouter, HTTPException

from app.schemas.history import HistoryResponse
from app.services.history_service import fetch_history

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get(
    "/",
    response_model=List[HistoryResponse]
)
def get_history():

    try:

        history = fetch_history()

        return history

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )