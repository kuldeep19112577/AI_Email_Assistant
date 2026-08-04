from app.prompts.rewrite_prompt import build_rewrite_prompt
from app.services.gemini_service import generate_content


def rewrite_email(
    original_email: str,
    instruction: str,
):

    prompt = build_rewrite_prompt(
        original_email=original_email,
        instruction=instruction,
    )

    return generate_content(prompt)