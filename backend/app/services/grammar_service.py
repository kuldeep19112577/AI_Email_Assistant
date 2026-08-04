from app.prompts.grammar_prompt import build_grammar_prompt
from app.services.gemini_service import generate_content


def grammar_check(text: str):

    prompt = build_grammar_prompt(text)

    return generate_content(prompt)