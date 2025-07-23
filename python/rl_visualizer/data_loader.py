from pathlib import Path

import torch


def read_dir(dir_base):
    TODO


def _read_raw(dir_base):
    dir_base = Path(dir_base)
    return dict(
        rollout_data=_read_folder(dir_base / "rollout_data"),
        train_data=_read_folder(dir_base / "train_data"),
    )


def _read_folder(directory: Path):
    return [
        # TODO use weight_only=True
        torch.load(p, map_location=torch.device("cpu"), weights_only=False)
        for p in sorted(list(directory.glob("*.pt")))
    ]
