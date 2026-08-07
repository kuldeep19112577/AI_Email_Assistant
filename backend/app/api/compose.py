from fastapi import APIRouter, Depends, HTTPException

from app.database.models import User
from app.dependencies import get_current_user
from app.schemas.compose import ComposeRequest, ComposeResponse
from app.services.compose_service import compose_email

router = APIRouter(
    prefix="/compose",
    tags=["Compose"]
)


@router.post(
    "/",
    response_model=ComposeResponse
)
def compose_email_api(
    request: ComposeRequest,
    current_user: User = Depends(get_current_user),
):

    try:

        generated_email = compose_email(
            user_id=current_user.id,
            prompt=request.prompt,
        )

        return ComposeResponse(
            email=generated_email
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )