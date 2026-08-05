from fastapi import APIRouter, Depends, HTTPException

from app.database.models import User
from app.dependencies import get_current_user
from app.schemas.grammar import (
    GrammarRequest,
    GrammarResponse
)

from app.services.grammar_service import check_grammar
router = APIRouter(
    prefix="/grammar",
    tags=["Grammar Check"]
)


@router.post(
    "/",
    response_model=GrammarResponse
)
def grammar_api(
    request: GrammarRequest,
    current_user: User = Depends(get_current_user),
):

    try:

        corrected = check_grammar(
            user_id=current_user.id,
            email=request.text,
        )

        return GrammarResponse(
            corrected_text=corrected
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )