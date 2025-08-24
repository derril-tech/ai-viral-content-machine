# Created automatically by Cursor AI (2024-08-24)
from pydantic_settings import BaseSettings
from typing import List, Optional
import os


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Viral Content Machine Orchestrator"
    VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS
    ALLOWED_HOSTS: List[str] = ["*"]
    
    # Database
    DATABASE_URL: str = "postgresql://vcm_user:vcm_password@localhost:5432/viral_content_machine"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # NATS
    NATS_URL: str = "nats://localhost:4222"
    
    # Object Storage
    S3_ENDPOINT: str = "http://localhost:9000"
    S3_ACCESS_KEY_ID: str = "vcm_minio_user"
    S3_SECRET_ACCESS_KEY: str = "vcm_minio_password"
    S3_BUCKET: str = "vcm-assets"
    S3_REGION: str = "us-east-1"
    S3_FORCE_PATH_STYLE: bool = True
    
    # JWT
    JWT_SECRET: str = "your-super-secret-jwt-key-change-in-production"
    JWT_EXPIRES_IN: int = 900  # 15 minutes
    
    # AI Providers
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    
    # Monitoring
    SENTRY_DSN: Optional[str] = None
    OTEL_ENDPOINT: Optional[str] = None
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
