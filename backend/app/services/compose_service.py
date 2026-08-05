from app.prompts.compose_prompt import build_compose_prompt
from app.services.gemini_service import generate_content
from app.services.history_service import save_history


def compose_email(
    user_id: int,
    prompt: str,
):

    compose_prompt = build_compose_prompt(
        prompt=prompt,
    )

    generated_email = generate_content(
        compose_prompt
    )

    save_history(
        user_id=user_id,
        feature="Compose",
        user_input=prompt,
        ai_output=generated_email,
    )

    return generated_email