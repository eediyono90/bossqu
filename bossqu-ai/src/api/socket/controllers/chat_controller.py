from fastapi import FastAPI, WebSocket, WebSocketDisconnect

from api.socket.controllers.base_controller import BaseSocketController
from core.services.assistant.assistant import AssistantService

class ChatSocketController(BaseSocketController):
    def __init__(self, assistant: AssistantService):
        self.assistant = assistant

    def setup_routes(self, app: FastAPI):
        @app.websocket("/ws/chat")
        async def handle_chat(ws: WebSocket):
            await ws.accept()
            try:
                while True:
                    message = await ws.receive_text()
                    response = self.assistant.invoke(message)
                    await ws.send_text(response)
            except WebSocketDisconnect:
                print("Client disconnected")