from app.prompts.rewrite_prompt import build_rewrite_prompt
from app.services.gemini_service import generate_content
from app.services.history_service import save_history


def rewrite_email(
    user_id: int,
    original_email: str,
    instruction: str,
):

    prompt = build_rewrite_prompt(
        original_email=original_email,
        instruction=instruction,
    )

    rewritten_email = generate_content(prompt)

    save_history(
        user_id=user_id,
        feature="Rewrite",
        user_input=original_email,
        ai_output=rewritten_email,
    )

    return rewritten_email