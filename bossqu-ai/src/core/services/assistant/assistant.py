import os

from langchain.prompts import PromptTemplate

from core.repositories.rag.rag import RAGRepository

from core.services.assistant.config.llm_config import LLMConfig
from core.services.assistant.llm_models.deepseek import DeepSeek

class AssistantService:
    def __init__(self, rag: RAGRepository):
        pass

    def invoke(self, prompt: str) -> str:
        pass

    def get_chat_history(self) -> list:
        pass

    def clear_chat_history(self):
        pass

class AssistantServiceImpl(AssistantService):
    def __init__(self, rag: RAGRepository):
        self.model = "Deepseek V3"
        self.config = LLMConfig.get(self.model)
        self.llm = DeepSeek(self.config)
        self.rag = rag
        self.pt = PromptTemplate(
            input_variables=["system", "context", "question"],
            template="""
                {system}
                Konteks percapakan:
                {context}
                Pertanyaan user:
                {question}
            """
        )
        self.conversation_history = []

    def build_prompt_context(self, query: str) -> str:
        context = self.rag.fetch_relevant_context(query)
        return context

    def update_prompt_context(self, prompt: str, response: str):
        # todo: implement async
        self.rag.add(
            [prompt, response],
            [{"role": "user"}, {"role": "assistant"}]
        )
        
    def invoke(self, prompt: str) -> str:
        self.conversation_history.append({"role": "user", "content": prompt})
        start = time.time()
        prompt_context = self.build_prompt_context(prompt)
        end = time.time()
        print(f"Time taken to build prompt context: {end - start} seconds")
        start = time.time()
        formatted_prompt = self.pt.format(
            system=self.config.get("default_system_context"),
            context=prompt_context,
            question=prompt
        )
        end = time.time()
        print(f"Time taken to format prompt: {end - start} seconds")
        start = time.time()
        response = self.llm.invoke_prompt(formatted_prompt)
        end = time.time()
        print(f"Time taken to invoke prompt: {end - start} seconds")
        self.update_prompt_context(prompt, response)
        self.conversation_history.append({"role": "assistant", "content": response})
        return response

    
    def get_chat_history(self) -> list:
        return self.conversation_history[::-1]
    
    def clear_chat_history(self):
        self.conversation_history = []
