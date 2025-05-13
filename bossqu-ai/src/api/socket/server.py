from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from api.socket.controllers.base_controller import BaseSocketController

class BossQuSocketServer:
    def __init__(self):
        self.app = FastAPI()
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        self.controllers = []

    def register_controller(self, controller: BaseSocketController):
        self.controllers.append(controller)

    def setup_routes(self):
        for controller in self.controllers:
            controller.setup_routes(self.app)
