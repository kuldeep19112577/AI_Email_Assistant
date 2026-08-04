from fastapi import APIRouter, HTTPException

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
def generate_email_api(request: EmailRequest):

    try:

        email = generate_email_service(
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

# @router.post("/generate")
# def generate_email(request: EmailRequest):

#     try:
#         generated_email = generate_email_service(request)

#         return {
#             "generated_email": generated_email
#         }

#     except Exception:
#         raise HTTPException(
#             status_code=500,
#             detail="Failed to generate email. Please try again."
#         )