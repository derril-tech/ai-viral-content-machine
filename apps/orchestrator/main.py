# Created automatically by Cursor AI (2024-08-24)
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from contextlib import asynccontextmanager
import uvicorn
from typing import Dict, Any

from app.core.config import settings
from app.core.database import init_db
from app.api.v1.api import api_router
from app.core.logging import setup_logging


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    setup_logging()
    await init_db()
    yield
    # Shutdown
    pass


app = FastAPI(
    title="Viral Content Machine Orchestrator",
    description="AI-powered content generation orchestration service",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Trusted host middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.ALLOWED_HOSTS,
)

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root() -> Dict[str, Any]:
    return {
        "message": "Viral Content Machine Orchestrator",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/health")
async def health_check() -> Dict[str, Any]:
    return {
        "status": "healthy",
        "service": "orchestrator",
        "version": "1.0.0"
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
