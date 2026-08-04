from fastapi import APIRouter, HTTPException

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
def change_tone_api(request: ToneRequest):

    try:

        modified_email = change_tone(
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