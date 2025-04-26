from langchain_openai import ChatOpenAI
from simawen.ai.bot.interfaces.llm import LLM

class OpenAI(LLM):
    def __init__(self, model: str, config: dict):
        super().__init__(model, config)
        if "api_key" not in config:
            raise ValueError("OPENAI_API_KEY is required please set it in the environment variables")
        
        self.llm = ChatOpenAI(model=model, temperature=config.get("temperature", 0.7), api_key=config.get("api_key"), use_responses_api=True)
        
    def invoke(self, prompt: str) -> str:
        response = self.llm.invoke(prompt)
        return self.parse_response(response)
    
    def parse_response(self, response: str) -> str:
        return response.content
