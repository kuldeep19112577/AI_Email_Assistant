from fastapi import APIRouter, HTTPException

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
def grammar_api(request: GrammarRequest):

    try:

        corrected = check_grammar(
            request.text
        )

        return GrammarResponse(
            corrected_text=corrected
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )