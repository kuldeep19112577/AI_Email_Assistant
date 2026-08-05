from fastapi import APIRouter, Depends, HTTPException

from app.database.models import User
from app.dependencies import get_current_user
from app.schemas.email import EmailRequest, EmailResponse
from app.services.email_service import generate_email as generate_email_service

router = APIRouter(
    prefix="/email",
    tags=["Email"]
)


@router.post(
    "/generate",
    response_model=EmailResponse
)
def generate_email_api(
    request: EmailRequest,
    current_user: User = Depends(get_current_user),
):

    try:

        email = generate_email_service(
            user_id=current_user.id,
            email_type=request.email_type,
            recipient=request.recipient,
            tone=request.tone,
            purpose=request.purpose,
        )

        return EmailResponse(
            generated_email=email
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Failed to generate email. Please try again."
        )