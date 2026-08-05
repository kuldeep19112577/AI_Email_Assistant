from app.database.connection import SessionLocal
from app.database.crud import (
    create_email_history,
    get_all_email_history,
)


def save_history(
    feature: str,
    user_input: str,
    ai_output: str,
):

    db = SessionLocal()

    try:

        create_email_history(

            db=db,

            feature=feature,

            user_input=user_input,

            ai_output=ai_output,

        )

    finally:

        db.close()


def fetch_history():

    db = SessionLocal()

    try:

        history = get_all_email_history(db)

        return history

    finally:

        db.close()