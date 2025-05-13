from core.services.assistant.llm_models.interface import LLMModel
from langchain_openai import ChatOpenAI

class DeepSeek(LLMModel):
    def __init__(self, config):
        super().__init__()
        self.llm = self.initialize_llm(config)
        
    def initialize_llm(self, config):
        return ChatOpenAI(
            openai_api_key=config.get("api_key"),
            base_url="https://api.fireworks.ai/inference/v1",
            model="accounts/fireworks/models/deepseek-v3"
        )

    def invoke_prompt(self, prompt: str) -> str:
        response = self.parse_prompt_response(self.llm.invoke(prompt))
        return response
    
    def parse_prompt_response(self, response: str) -> str:
        return response.content
