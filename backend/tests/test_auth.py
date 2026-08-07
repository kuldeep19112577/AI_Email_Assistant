def test_signup_success(client):
    response = client.post("/auth/signup", json={
        "full_name": "Test User",
        "email": "test@example.com",
        "password": "StrongPass1",
    })
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"


def test_signup_duplicate_email(client):
    payload = {"full_name": "Test User", "email": "dupe@example.com", "password": "StrongPass1"}
    client.post("/auth/signup", json=payload)
    response = client.post("/auth/signup", json=payload)
    assert response.status_code == 409


def test_login_success(client):
    client.post("/auth/signup", json={
        "full_name": "Login User", "email": "login@example.com", "password": "StrongPass1",
    })
    response = client.post("/auth/login", data={
        "username": "login@example.com", "password": "StrongPass1",
    })
    assert response.status_code == 200
    assert "access_token" in response.json()


def test_login_wrong_password(client):
    client.post("/auth/signup", json={
        "full_name": "Login User", "email": "login2@example.com", "password": "StrongPass1",
    })
    response = client.post("/auth/login", data={
        "username": "login2@example.com", "password": "WrongPass1",
    })
    assert response.status_code == 401


def test_me_requires_token(client):
    response = client.get("/auth/me")
    assert response.status_code == 401