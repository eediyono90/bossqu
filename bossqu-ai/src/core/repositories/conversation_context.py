from abc import ABC, abstractmethod
from typing import List, Optional

class ConversationContextRepository(ABC):
    def __init__(self):
        pass

    @abstractmethod
    def add(self, texts, metadatas):
        pass

    @abstractmethod
    def fetch_relevant_context(self, query: str):
        pass


class ChromaConversationContextRepository(ConversationContextRepository):
    def __init__(self, vector_store):
        self.vector_store = vector_store

    def add(self, texts, metadatas):
        self.vector_store.add_texts(texts, metadatas)

    def fetch_relevant_context(self, query):
        return self.vector_store.similarity_search_with_score(
            query,
            k=10
        ) 