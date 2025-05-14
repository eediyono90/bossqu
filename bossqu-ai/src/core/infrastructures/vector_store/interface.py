from abc import ABC, abstractmethod

class VectorStore(ABC):
    @staticmethod
    @abstractmethod
    def init():
        pass
