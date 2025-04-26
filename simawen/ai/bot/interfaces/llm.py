from abc import ABC, abstractmethod

class LLM(ABC):
    def __init__(self, model: str, config: dict):
        self.model = model
        self.config = config
        self.model_display_name = config.get("model_display_name")

    @abstractmethod
    def invoke(self, prompt: str) -> str:
        pass

    @abstractmethod
    def parse_response(self, response: str) -> str:
        pass
    
