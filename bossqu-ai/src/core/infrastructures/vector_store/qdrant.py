import os

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams

from core.infrastructures.vector_store.interface import VectorStore

class QdVectorStore(VectorStore):
    collection_name = "bossqu-chat"
    vector_size = 384
    embedding_model = "intfloat/multilingual-e5-small"

    @staticmethod
    def init():
        embeddings = HuggingFaceEmbeddings(
            model_name=QdVectorStore.embedding_model
        )
        print(os.getenv("QDRANT_HOST"))
        print(os.getenv("QDRANT_PORT"))
        client = QdrantClient(
            host=os.getenv("QDRANT_HOST"),
            port=int(os.getenv("QDRANT_PORT"))
        )

        if not client.collection_exists(QdVectorStore.collection_name):
            client.create_collection(
                collection_name=QdVectorStore.collection_name,
                vectors_config=VectorParams(
                    size=QdVectorStore.vector_size,
                    distance=Distance.COSINE
                )
            )
        else:
            # Recreate the collection if the vector size is different
            collection_info = client.get_collection(QdVectorStore.collection_name)
            if collection_info.dict()["result"]["config"]["params"]["vectors"]["size"] != QdVectorStore.vector_size:
                client.delete_collection(QdVectorStore.collection_name)
                client.create_collection(
                    collection_name=QdVectorStore.collection_name,
                    vectors_config=VectorParams(
                        size=QdVectorStore.vector_size,
                        distance=Distance.COSINE
                    )
                )
        vs = QdrantVectorStore(
            client=client,
            collection_name=QdVectorStore.collection_name,
            embedding=embeddings
        )
        
        return vs