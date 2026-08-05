from app.prompts.rewrite_prompt import build_rewrite_prompt
from app.services.gemini_service import generate_content
from app.services.history_service import save_history


def rewrite_email(
    email: str,
):

    prompt = build_rewrite_prompt(

        email=email,

    )

    rewritten_email = generate_content(prompt)

    save_history(

        feature="Rewrite",

        user_input=email,

        ai_output=rewritten_email,

    )

    return rewritten_email