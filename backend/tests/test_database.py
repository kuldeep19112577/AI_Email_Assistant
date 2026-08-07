from app.database.crud import create_user, get_user_by_email, create_email_history, get_all_email_history


def test_create_and_get_user(db_session):
    user = create_user(db_session, full_name="A B", email="a@b.com", password="hashed")
    assert user.id is not None
    fetched = get_user_by_email(db_session, "a@b.com")
    assert fetched.email == "a@b.com"


def test_email_history(db_session):
    user = create_user(db_session, full_name="A B", email="hist@b.com", password="hashed")
    create_email_history(db_session, user_id=user.id, feature="Grammar",
                        user_input="teh cat", ai_output="the cat")
    history = get_all_email_history(db_session, user.id)
    assert len(history) == 1
    assert history[0].feature == "Grammar"