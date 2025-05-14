import os
from dotenv import load_dotenv

# infrastructure
from core.infrastructures.vector_store.interface import VectorStore
from core.infrastructures.vector_store.qdrant import QdVectorStore
# repositories
from core.repositories.rag.rag import RAGRepository, QdrantRAGRepository

# services
from core.services.assistant.assistant import AssistantService, AssistantServiceImpl

# socket server
from api.socket.controllers.base_controller import BaseSocketController
from api.socket.controllers.chat_controller import ChatSocketController
from api.socket.server import BossQuSocketServer

import uvicorn

if __name__ == "__main__":
    load_dotenv()

    # infrastructure
    vs = QdVectorStore.init()

    # repositories
    rag: RAGRepository = QdrantRAGRepository(vs)
    # services
    assistant: AssistantService = AssistantServiceImpl(rag)

    # controllers
    chat_socket_controller: BaseSocketController = ChatSocketController(assistant)

    # socket api
    server = BossQuSocketServer()
    server.register_controller(chat_socket_controller)
    server.setup_routes()
    uvicorn.run(server.app, host="0.0.0.0", port=int(os.getenv("PORT")))