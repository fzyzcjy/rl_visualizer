import pickle
from pathlib import Path


def read_dir(dir_base):
    TODO


def _read_raw(dir_base)
    dir_base = Path(dir_base)

    _read_folder(dir_base / "rollout_data")
    _read_folder(dir_base / "train_data")

    return TODO


def _read_folder(directory: Path):
    return [pickle.load(p) for p in sorted(list(directory.glob("*.pt")))]
