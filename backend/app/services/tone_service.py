from app.prompts.tone_prompt import build_tone_prompt
from app.services.gemini_service import generate_content


def change_tone(
    email: str,
    tone: str,
):

    prompt = build_tone_prompt(
        email=email,
        tone=tone,
    )

    return generate_content(prompt)