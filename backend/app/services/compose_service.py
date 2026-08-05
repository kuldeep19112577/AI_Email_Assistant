from app.prompts.compose_prompt import build_compose_prompt
from app.services.gemini_service import generate_content


def compose_email(
    prompt: str,
):

    compose_prompt = build_compose_prompt(
        prompt=prompt,
    )

    return generate_content(compose_prompt)