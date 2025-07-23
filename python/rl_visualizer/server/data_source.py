from .. import data_loader

class DataSource:
    def __init__(self):
        self._cache = {}
    
    def get(self, path: str):
        if path not in self._cache:
            self._cache[path] = self._load(path)
        return self._cache[path]
    
    def _load(self, path: str):
        return data_loader.read_dir(path)

_INSTANCE = DataSource()

def get_data_source():
    return _INSTANCE
