import os

from bossqu.ai.bot.llm_models.deepseek import DeepSeek
from bossqu.ai.config.llm import MODEL_CONFIGS

class AssistantService:
    def __init__(self):
        self.llm = DeepSeek()
        self.model_name = "Deepseek V3"
        self.conversation_history = []
        
    def invoke(self, prompt: str) -> str:
        return self.llm.invoke_prompt(prompt)
    
    def parse_response(self, response: str) -> str:
        return self.llm.parse_response(response)
    
    def get_chat_history(self) -> list:
        return self.conversation_history[::-1]
    
    def clear_chat_history(self):
        self.conversation_history = []
