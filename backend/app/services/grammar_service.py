from app.prompts.grammar_prompt import build_grammar_prompt
from app.services.gemini_service import generate_content
from app.services.history_service import save_history


def check_grammar(
    user_id: int,
    email: str,
):

    prompt = build_grammar_prompt(

        text=email,

    )

    corrected_email = generate_content(prompt)

    save_history(

        user_id=user_id,

        feature="Grammar",

        user_input=email,

        ai_output=corrected_email,

    )

    return corrected_email