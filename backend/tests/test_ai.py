from unittest.mock import patch


def test_generate_content_calls_gemini_client():
    with patch("app.services.gemini_service.client") as mock_client:
        mock_client.models.generate_content.return_value.text = "mocked output"
        from app.services.gemini_service import generate_content
        result = generate_content("say hi")
        assert result == "mocked output"
        mock_client.models.generate_content.assert_called_once()