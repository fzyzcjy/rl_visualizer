from pathlib import Path
import polars as pl
import torch


def read_dir(dir_base):
    return _convert_data(_read_raw_data(dir_base))


def _read_raw_data(dir_base):
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


def _convert_data(data):
    df_rollout = _convert_rollout_data(data["rollout_data"])
    df_train = _convert_train_data(data["train_data"])
    return df_rollout.join(df_train, on='sample_index', how='left')


def _convert_rollout_data(rollout_data):
    rows = [
        {"rollout_id": data_pack["rollout_id"], **sample}
        for data_pack in rollout_data
        for sample in data_pack["samples"]
    ]
    df_rollout = pl.DataFrame(rows)

    df_rollout = df_rollout.rename({"index": "sample_index"})
    df_rollout = df_rollout.sort("sample_index")
    assert df_rollout["sample_index"].n_unique() == len(df_rollout)

    return df_rollout


def _convert_train_data(train_data):
    def _process_value(x):
        if isinstance(x, torch.Tensor):
            return x.tolist()
        return x

    rows = []
    for data_pack in train_data:
        rollout_data = data_pack["rollout_data"]
        rollout_data_keys = list(train_data[0]["rollout_data"].keys())
        for index in range(len(rollout_data["sample_indices"])):
            rows.append(
                {k: data_pack[k] for k in [
                    # "rollout_id", "rank"
                ]}
                | {k: _process_value(rollout_data[k][index])
                   for k in rollout_data_keys
                   if k not in ["tokens", "truncated", "response_length"]
                   }
            )
    df_train = pl.DataFrame(rows)

    df_train = df_train.rename({
        "sample_indices": "sample_index",
        "rewards": "reward_value",
        "total_lengths": "total_length",
    })
    df_train = df_train.unique()
    df_train = df_train.sort("sample_index")
    assert df_train["sample_index"].n_unique() == len(df_train)

    return df_train
