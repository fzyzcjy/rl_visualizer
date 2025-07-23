import polars as pl
from typing import Any, Dict, List
from fastapi import APIRouter, Depends, Query
from ..data_source import DataSource, get_data_source
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/rollout",
    tags=["rollout"],
)

class RolloutGetResponse(BaseModel):
    table_rows: List[Dict[str, Any]]

@router.get("/{rollout_id}")
def get(
    rollout_id: int,
    run_id: str = Query(...),
    data_source: DataSource = Depends(get_data_source)
) -> RolloutGetResponse:
    df = data_source.get(run_id)
    df = df.filter(pl.col("rollout_id") == rollout_id)
    return RolloutGetResponse(table_rows=df.to_dicts())
