from unittest.mock import patch


def _signup_and_login(client, email="feat@test.com"):
    client.post(
        "/auth/signup",
        json={
            "full_name": "Feat User",
            "email": email,
            "password": "StrongPass1"
        }
    )

    resp = client.post(
        "/auth/login",
        data={
            "username": email,
            "password": "StrongPass1"
        }
    )

    return resp.json()["access_token"]


def test_grammar_endpoint(client):

    token = _signup_and_login(client)

    with patch(
    "app.services.grammar_service.generate_content",
    return_value="Corrected text."
), patch(
    "app.services.grammar_service.save_history"
):

        response = client.post(
            "/grammar/",
            json={
                "text": "This are a test sentence."
            },
            headers={
                "Authorization": f"Bearer {token}"
            }
        )

    print(response.status_code)
    print(response.json())

    assert response.status_code == 200
    assert response.json()["corrected_text"] == "Corrected text."


def test_grammar_endpoint_requires_auth(client):

    response = client.post(
        "/grammar/",
        json={
            "text": "This are a test sentence."
        }
    )

    assert response.status_code == 401
    
def test_generate_email_endpoint(client):

    token = _signup_and_login(client, "email@test.com")

    with patch(
        "app.services.email_service.generate_content",
        return_value="Generated Email"
    ), patch(
        "app.services.email_service.save_history"
    ):

        response = client.post(
            "/email/generate",
            json={
                "email_type": "Professional",
                "recipient": "Manager",
                "tone": "Formal",
                "purpose": "Leave Application"
            },
            headers={
                "Authorization": f"Bearer {token}"
            }
        )

    assert response.status_code == 200
    assert response.json()["generated_email"] == "Generated Email"
    
def test_rewrite_endpoint(client):

    token = _signup_and_login(client, "rewrite@test.com")

    with patch(
        "app.services.rewrite_service.generate_content",
        return_value="Rewritten Email"
    ), patch(
        "app.services.rewrite_service.save_history"
    ):

        response = client.post(
            "/rewrite/",
            json={
                "original_email": "Hello Sir, How are you?",
                "instruction": "Make it professional"
            },
            headers={
                "Authorization": f"Bearer {token}"
            }
        )

    assert response.status_code == 200
    assert response.json()["rewritten_email"] == "Rewritten Email" 
    
def test_tone_endpoint(client):

    token = _signup_and_login(client, "tone@test.com")

    with patch(
        "app.services.tone_service.generate_content",
        return_value="Friendly Email"
    ), patch(
        "app.services.tone_service.save_history"
    ):

        response = client.post(
            "/tone/",
            json={
                "email": "Meeting tomorrow",
                "tone": "Friendly"
            },
            headers={
                "Authorization": f"Bearer {token}"
            }
        )

    assert response.status_code == 200
    assert response.json()["modified_email"] == "Friendly Email"
    
def test_compose_endpoint(client):

    token = _signup_and_login(client, "compose@test.com")

    with patch(
        "app.services.compose_service.generate_content",
        return_value="Composed Email"
    ), patch(
        "app.services.compose_service.save_history"
    ):

        response = client.post(
            "/compose/",
            json={
                "prompt": "Invite client for meeting"
            },
            headers={
                "Authorization": f"Bearer {token}"
            }
        )

    assert response.status_code == 200
    assert response.json()["email"] == "Composed Email"
    
def test_history_endpoint(client):

    token = _signup_and_login(client, "history@test.com")

    fake_history = [
        {
            "id": 1,
            "feature": "Grammar",
            "user_input": "abc",
            "ai_output": "xyz",
            "created_at": "2025-01-01T00:00:00"
        }
    ]

    with patch(
        "app.api.history.fetch_history",
        return_value=fake_history
    ):

        response = client.get(
            "/history/",
            headers={
                "Authorization": f"Bearer {token}"
            }
        )

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["feature"] == "Grammar"