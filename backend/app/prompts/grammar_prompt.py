def build_grammar_prompt(text: str):

    return f"""
You are an expert English grammar assistant.

Correct the grammar, spelling, punctuation, and sentence structure of the following text.

Rules:

1. Preserve the original meaning.
2. Do not change the writing style unless necessary.
3. Correct grammar mistakes.
4. Correct spelling mistakes.
5. Improve punctuation.
6. Improve readability.
7. Return only the corrected text.

Text:

{text}
"""