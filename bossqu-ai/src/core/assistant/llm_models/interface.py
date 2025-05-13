from abc import ABC, abstractmethod

class LLMModel(ABC):
    def __init__(self):
        self.model = model
        self.config = config

    @abstractmethod
    def initialize_llm(self):
        pass

    @abstractmethod
    def invoke_prompt(self, prompt: str) -> str:
        pass

    @abstractmethod
    def parse_prompt_response(self, response: str) -> str:
        pass
    
