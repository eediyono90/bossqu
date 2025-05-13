from langchain_openai import ChatOpenAI
from simawen.ai.bot.interfaces.llm import LLM

class DeepSeek(LLMModel):
    def __init__(self):
        super().__init__()
        self.llm = self.initialize_llm()
        
    def initialize_llm(self):
        return ChatOpenAI(
            openai_api_key=config.get("api_key"),
            base_url="https://api.fireworks.ai/inference/v1",
            model="accounts/fireworks/models/deepseek-v3"
        )

    def invoke_prompt(self, prompt: str) -> str:
        self.history.append({"role": "user", "content": prompt})
        response = self.parse_response(self.llm.invoke(self.history))
        return response
    
    def parse_prompt_response(self, response: str) -> str:
        return response.content
