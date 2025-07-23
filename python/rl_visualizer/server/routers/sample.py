from typing import List
import polars as pl
from fastapi import APIRouter, Depends, Query
from ..data_source import DataSource, get_data_source
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/sample",
    tags=["sample"],
)

class SampleGetResponse(BaseModel):
    rollout_id: int
    sample_index: int
    prompt: str
    tokens: List[int]
    response: str
    response_length: int
    reward_value: float
    status: str
    loss_masks: List[int]
    ref_log_probs: List[float]
    log_probs: List[float]
    advantages: List[float]
    returns: List[float]
    # TODO more

@router.get("/{sample_index}")
def get(
    sample_index: int,
    run_id: str = Query(...),
    data_source: DataSource = Depends(get_data_source)
) -> SampleGetResponse:
    df = data_source.get(run_id)
    df = df.filter(pl.col("sample_index") == sample_index)
    assert len(df) == 1
    return SampleGetResponse(**df.to_dicts()[0])
