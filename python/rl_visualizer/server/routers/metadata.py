from transformers import AutoTokenizer
import polars as pl
from typing import Any, Dict, List
from fastapi import APIRouter, Depends, Query
from ..data_source import DataSource, get_data_source
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/metadata",
    tags=["metadata"],
)

class MetadataGetTokenizerResponse(BaseModel):
    id_to_str: Dict[int, str]

@router.get("/tokenizer")
def get_tokenizer(
    run_id: str = Query(...),
    data_source: DataSource = Depends(get_data_source)
) -> MetadataGetTokenizerResponse:
    tokenizer = AutoTokenizer.from_pretrained(run_id + "/tokenizer")
    return MetadataGetTokenizerResponse(
        id_to_str={v: k for k, v in tokenizer.get_vocab().items()},
    )
