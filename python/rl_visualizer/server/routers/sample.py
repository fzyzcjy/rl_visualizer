from fastapi import APIRouter, Depends
from ..data_source import DataSource, get_data_source

router = APIRouter(
    prefix="/api/sample",
    tags=["sample"],
)

@router.get("/{sample_index}")
def get(sample_index: int, data_source: DataSource = Depends(get_data_source)):
    return {"value": "sample"}
