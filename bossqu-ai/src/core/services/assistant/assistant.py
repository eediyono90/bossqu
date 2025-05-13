import os

from langchain.prompts import PromptTemplate

from core.repositories.conversation_context import ConversationContextRepository

from core.services.assistant.config.llm_config import LLMConfig
from core.services.assistant.llm_models.deepseek import DeepSeek

class AssistantService:
    def __init__(self, ccr: ConversationContextRepository):
        pass

    def invoke(self, prompt: str) -> str:
        pass

    def get_chat_history(self) -> list:
        pass

    def clear_chat_history(self):
        pass

class AssistantServiceImpl(AssistantService):
    def __init__(self, ccr: ConversationContextRepository):
        self.model = "Deepseek V3"
        self.config = LLMConfig.get(self.model)
        self.llm = DeepSeek(self.config)
        self.ccr = ccr
        self.pt = PromptTemplate(
            input_variables=["system", "context", "question"],
            template="""
                {system}
                Context chat history:
                {context}
                Pertanyaan user:
                {question}
            """
        )
        self.conversation_history = []

    def build_prompt_context(self, query: str) -> str:
        context = self.ccr.fetch_relevant_context(query)
        return "\n".join([doc.page_content for doc, _ in context])

    def update_prompt_context(self, prompt: str, response: str):
        # todo: implement async
        self.ccr.add(
            [prompt, response],
            [{"role": "user"}, {"role": "assistant"}]
        )
        
    def invoke(self, prompt: str) -> str:
        self.conversation_history.append({"role": "user", "content": prompt})
        prompt_context = self.build_prompt_context(prompt)
        formatted_prompt = self.pt.format(
            system=self.config.get("default_system_context"),
            context=prompt_context,
            question=prompt
        )
        response = self.llm.invoke_prompt(formatted_prompt)
        self.update_prompt_context(prompt, response)
        self.conversation_history.append({"role": "assistant", "content": response})
        return response

    
    def get_chat_history(self) -> list:
        return self.conversation_history[::-1]
    
    def clear_chat_history(self):
        self.conversation_history = []
