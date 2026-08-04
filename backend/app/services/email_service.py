from app.prompts.email_prompt import build_email_prompt
from app.services.gemini_service import generate_content


def generate_email(
    email_type: str,
    recipient: str,
    tone: str,
    purpose: str,
):

    prompt = build_email_prompt(
        email_type=email_type,
        recipient=recipient,
        tone=tone,
        purpose=purpose,
    )

    return generate_content(prompt)