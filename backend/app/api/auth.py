
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.database.crud import create_user, get_user_by_email
from app.utils.password import hash_password, verify_password
from app.schemas.user import SignupRequest, LoginRequest
router = APIRouter(prefix="/auth", tags=["Authentication"])
from app.utils.jwt_handler import create_access_token
from fastapi.security import OAuth2PasswordRequestForm

from app.dependencies import get_current_user
from app.database.models import User

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/signup")
def signup(user: SignupRequest, db: Session = Depends(get_db)):

    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email already registered."
        )

    hashed_password = hash_password(user.password)

    new_user = create_user(
        db=db,
        full_name=user.full_name,
        email=user.email,
        password=hashed_password
    )

    return {
        "message": "User registered successfully",
        "user_id": new_user.id,
        "email": new_user.email
    }
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    # Check if the email exists
    existing_user = get_user_by_email(
    db,
    form_data.username
)

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Verify the password
    if not verify_password(form_data.password, existing_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Login successful
    token = create_access_token(
    {
        "sub": existing_user.email
    }
)
    return {
    "message": "Login successful",
    "access_token": token,
    "token_type": "bearer"
}
    
@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email
    }