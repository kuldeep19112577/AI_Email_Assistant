from sqlalchemy.orm import Session

from app.database.models import (
    User,
    EmailHistory,
)


# =====================================
# USER CRUD
# =====================================

def get_user_by_email(
    db: Session,
    email: str,
):

    return db.query(User).filter(
        User.email == email
    ).first()


def create_user(
    db: Session,
    full_name,
    email,
    password,
):

    user = User(
        full_name=full_name,
        email=email,
        password=password,
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user


# =====================================
# EMAIL HISTORY CRUD
# =====================================

def create_email_history(
    db: Session,
    feature: str,
    user_input: str,
    ai_output: str,
):

    history = EmailHistory(

        feature=feature,

        user_input=user_input,

        ai_output=ai_output,

    )

    db.add(history)

    db.commit()

    db.refresh(history)

    return history


def get_all_email_history(
    db: Session,
):

    return (

        db.query(EmailHistory)

        .order_by(
            EmailHistory.created_at.desc()
        )

        .all()

    )