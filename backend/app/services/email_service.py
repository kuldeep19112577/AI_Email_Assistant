from app.prompts.email_prompt import build_email_prompt
from app.services.gemini_service import generate_content
from app.services.history_service import save_history


def generate_email(
    user_id: int,
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

    generated_email = generate_content(prompt)

    save_history(
        user_id=user_id,
        feature="Generate",
        user_input=(
            f"Email Type: {email_type}\n"
            f"Recipient: {recipient}\n"
            f"Tone: {tone}\n"
            f"Purpose: {purpose}"
        ),
        ai_output=generated_email,
    )

    return generated_email