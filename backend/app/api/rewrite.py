from fastapi import APIRouter, HTTPException

from app.schemas.rewrite import RewriteRequest, RewriteResponse
from app.services.rewrite_service import rewrite_email

router = APIRouter(
    prefix="/rewrite",
    tags=["Rewrite"]
)


@router.post(
    "/",
    response_model=RewriteResponse
)
def rewrite_email_api(request: RewriteRequest):

    try:

        rewritten_email = rewrite_email(
            original_email=request.original_email,
            instruction=request.instruction,
        )

        return RewriteResponse(
            rewritten_email=rewritten_email
        )
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )