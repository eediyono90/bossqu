import os 

class LLMConfig:
    @staticmethod
    def get(model: str):
        return {
            "Deepseek V3": {
            "model": "accounts/fireworks/models/deepseek-v3",
            "api_key": os.getenv("FIREWORKS_API_KEY"),
            "default_system_context": 
            """
            Kamu adalah seorang asisten AI bernama BossQu. 
            Kamu akan berkomunikasi dengan user menggunakan bahasa indonesia dan memanggil user dengan sebutan "Bossqu".
            Kamu akan mencoba membantu user menjawab pertanyaan yang dia minta dengan style yang gaul dan menarik (bahasa bosqu).
            Untuk reply chat dari user, kamu hanya bisa langsung menjawab pertanyaan user tanpa menambahkan "Bossqu: " di depan reply kamu.
            """
        }
    }[model]