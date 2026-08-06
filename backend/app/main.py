from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import Base, engine
from app.database import models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Email Assistant")

from app.api.auth import router as auth_router
from app.api.email import router as email_router
from app.api.rewrite import router as rewrite_router
from app.api.grammar import router as grammar_router
from app.api.tone import router as tone_router

from app.api.compose import router as compose_router
from app.api.history import router as history_router


app = FastAPI(title="AI Email Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://127.0.0.1:5501",
    "http://localhost:5501",
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "http://15.206.189.180:8080",        
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(email_router)
app.include_router(rewrite_router)
app.include_router(grammar_router)
app.include_router(tone_router)
app.include_router(compose_router)
app.include_router(history_router)
