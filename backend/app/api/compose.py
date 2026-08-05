from fastapi import APIRouter, HTTPException

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
def compose_email_api(request: ComposeRequest):

    try:

        generated_email = compose_email(
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