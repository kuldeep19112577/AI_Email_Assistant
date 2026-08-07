from fastapi import APIRouter, Depends, HTTPException

from app.database.models import User
from app.dependencies import get_current_user
from app.schemas.tone import ToneRequest, ToneResponse
from app.services.tone_service import change_tone

router = APIRouter(
    prefix="/tone",
    tags=["Tone"]
)


@router.post(
    "/",
    response_model=ToneResponse
)
def change_tone_api(
    request: ToneRequest,
    current_user: User = Depends(get_current_user),
):

    try:

        modified_email = change_tone(
            user_id=current_user.id,
            email=request.email,
            tone=request.tone,
        )

        return ToneResponse(
            modified_email=modified_email
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )