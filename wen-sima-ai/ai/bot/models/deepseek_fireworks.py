from langchain_openai import ChatOpenAI
from simawen.ai.bot.interfaces.llm import LLM

class DeepseekFireworks(LLM):
    def __init__(self, model: str, config: dict):
        super().__init__(model, config)
        if "api_key" not in config:
            raise ValueError("api key is required please set it in the environment variables")
        if "model" not in config:
            raise ValueError("model is required please set it in the environment variables")
        
        self.llm = ChatOpenAI(
            openai_api_key=config.get("api_key"),
            base_url="https://api.fireworks.ai/inference/v1",
            model=self.model
        )

        if "history" not in config:
            self.history = []
        else:
            self.history = config.get("history")
        
    def invoke(self, prompt: str) -> str:
        self.history.append({"role": "user", "content": prompt})
        response = self.parse_response(self.llm.invoke(self.history))
        self.history.append({"role": "assistant", "content": response})
        return response
    
    def parse_response(self, response: str) -> str:
        return response.content
    
    def get_history(self) -> list:
        return self.history
    
    def clear_history(self):
        self.history = []
