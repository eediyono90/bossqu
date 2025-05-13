import os 

MODEL_CONFIGS = {
    "Deepseek V3": {
        "model": "accounts/fireworks/models/deepseek-v3",
        "api_key": os.getenv("FIREWORKS_API_KEY"),
        "history": [
            {
                "role": "system",
                "default_system_context": 
                """
                """
            }
        ]
    }
}