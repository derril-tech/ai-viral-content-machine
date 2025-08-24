# Created automatically by Cursor AI (2024-08-24)
from fastapi import APIRouter
from app.api.v1.endpoints import campaigns, angles, copy, assets, hashtags, schedule, exports, analytics

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(campaigns.router, prefix="/campaigns", tags=["campaigns"])
api_router.include_router(angles.router, prefix="/angles", tags=["angles"])
api_router.include_router(copy.router, prefix="/copy", tags=["copy"])
api_router.include_router(assets.router, prefix="/assets", tags=["assets"])
api_router.include_router(hashtags.router, prefix="/hashtags", tags=["hashtags"])
api_router.include_router(schedule.router, prefix="/schedule", tags=["schedule"])
api_router.include_router(exports.router, prefix="/exports", tags=["exports"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
