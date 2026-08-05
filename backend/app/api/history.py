from typing import List

from fastapi import APIRouter, Depends, HTTPException

from app.database.models import User
from app.dependencies import get_current_user
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
def get_history(current_user: User = Depends(get_current_user)):

    try:

        history = fetch_history(current_user.id)

        return history

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )