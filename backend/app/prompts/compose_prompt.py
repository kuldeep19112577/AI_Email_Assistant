def build_compose_prompt(
    prompt: str,
):
    return f"""
You are an expert email writer.

Write a complete email based on the user's request.

User Request:
{prompt}

Rules:
- Generate a suitable subject line.
- Include a professional greeting.
- Write a clear and complete email body.
- Use an appropriate closing.
- Keep the tone professional unless the request specifies otherwise.
- Return only the completed email.
"""