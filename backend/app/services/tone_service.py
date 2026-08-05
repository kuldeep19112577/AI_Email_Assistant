from app.prompts.tone_prompt import build_tone_prompt
from app.services.gemini_service import generate_content
from app.services.history_service import save_history


def change_tone(
    email: str,
    tone: str,
):

    prompt = build_tone_prompt(

        email=email,

        tone=tone,

    )

    modified_email = generate_content(prompt)

    save_history(

        feature="Tone",

        user_input=f"Tone: {tone}\n\nEmail:\n{email}",

        ai_output=modified_email,

    )

    return modified_email