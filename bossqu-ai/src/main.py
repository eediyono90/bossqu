from dotenv import load_dotenv

# repositories
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain_community.vectorstores import Chroma
from core.repositories.conversation_context import ConversationContextRepository, ChromaConversationContextRepository

# services
from core.services.assistant.assistant import AssistantService, AssistantServiceImpl

# socket server
from api.socket.controllers.base_controller import BaseSocketController
from api.socket.controllers.chat_controller import ChatSocketController
from api.socket.server import BossQuSocketServer

import uvicorn

def init_vector_store():
    embeddings = HuggingFaceBgeEmbeddings(
        model_name="BAAI/bge-base-en-v1.5"
    )
    vs = Chroma(
        collection_name="bossqu-chat",
        persist_directory="./store",
        embedding_function=embeddings
    )
    return vs

if __name__ == "__main__":
    load_dotenv()

    # repositories
    vs = init_vector_store()
    ccr: ConversationContextRepository = ChromaConversationContextRepository(vs)
    # services
    assistant: AssistantService = AssistantServiceImpl(ccr)

    # controllers
    chat_socket_controller: BaseSocketController = ChatSocketController(assistant)
    # socket api
    server = BossQuSocketServer()
    server.register_controller(chat_socket_controller)
    server.setup_routes()
    uvicorn.run(server.app, host="0.0.0.0", port=8000)