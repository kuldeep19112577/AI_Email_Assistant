def build_email_prompt(
    email_type: str,
    recipient: str,
    tone: str,
    purpose: str
):
    return f"""
You are an expert professional email writer.

Write a complete email using the following information.

Email Type:
{email_type}

Recipient:
{recipient}

Tone:
{tone}

Purpose:
{purpose}

Instructions:
- Write a professional email.
- Include an appropriate subject line.
- Include a greeting.
- Write a clear and concise body.
- End with a polite closing.
- Return only the email content.
"""