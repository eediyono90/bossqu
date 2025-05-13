from abc import ABC, abstractmethod
from fastapi import FastAPI

class BaseSocketController(ABC):
    @abstractmethod
    def setup_routes(self, app: FastAPI):
        pass