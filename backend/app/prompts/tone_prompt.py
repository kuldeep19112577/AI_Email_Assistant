def build_tone_prompt(
    email: str,
    tone: str,
):
    return f"""
You are an expert email editor.

Change the tone of the following email.

Target Tone:
{tone}

Email:
{email}

Rules:
- Keep the original meaning.
- Do not remove important information.
- Only change the writing tone.
- Return only the modified email.
"""