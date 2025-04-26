import os

from simawen.ai.bot.models.open_ai import OpenAI
from simawen.ai.bot.models.deepseek_fireworks import DeepseekFireworks
from simawen.ai.bot.constants.model import LLM_MODELS
from simawen.ai.config.llm import MODEL_CONFIGS

class SimaBot:
    def __init__(self, model_name=""):
        if model_name not in LLM_MODELS:
            raise ValueError(f"Invalid model name: {model_name}")
        
        self.llm = self.initialize_llm(model_name)

    def initialize_llm(self, model_name: str):
        if model_name == "GPT":
            return OpenAI(model="gpt-4o-mini", config={ "api_key": os.getenv("OPENAI_API_KEY"), "temperature": 0.7 })
        elif model_name == "Deepseek V3 (via Fireworks AI)":
            return DeepseekFireworks(model="accounts/fireworks/models/deepseek-v3", config=MODEL_CONFIGS[model_name])
        else:
            raise ValueError(f"Invalid model name: {model_name}")

    def invoke(self, prompt: str) -> str:
        return self.llm.invoke(prompt)
    
    def parse_response(self, response: str) -> str:
        return self.llm.parse_response(response)
    
    def get_chat_history(self) -> list:
        return self.llm.get_history()[::-1]
    
    def clear_chat_history(self):
        self.llm.clear_history()
    
    def get_model_display_name(self) -> str:
        return self.llm.model_display_name
