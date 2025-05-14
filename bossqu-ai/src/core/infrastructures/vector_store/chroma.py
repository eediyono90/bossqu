import os

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

from core.infrastructures.vector_store.interface import VectorStore

class ChromaVectorStore(VectorStore):
    @staticmethod
    def init():
        embeddings = HuggingFaceEmbeddings(
            model_name="BAAI/bge-base-en-v1.5"
        )
        vs = Chroma(
            collection_name="bossqu-chat",
            persist_directory=os.getenv("CHROMA_PERSIST_DIRECTORY"),
            embedding_function=embeddings
        )
        return vs