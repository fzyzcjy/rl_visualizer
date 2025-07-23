from fastapi import APIRouter, Depends
from ..data_source import DataSource, get_data_source
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/rollout",
    tags=["rollout"],
)

class RolloutGetResponse(BaseModel):
    pass

@router.get("/{rollout_id}")
def get(rollout_id: int, data_source: DataSource = Depends(get_data_source)) -> RolloutGetResponse:
    return TODO
