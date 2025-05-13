from chromadb import Client
from chromadb.config import Settings

class ChromaVectorStoreRepository:
    def __init__(self, vs):
        self.vs = vs

    def add_documents(self, texts, metadatas):
        self.vs.add_texts(texts, metadatas)

    def similarity_search(self, query):
        return self.vs.similarity_search_with_score(
            query,
            k=10
        ) 