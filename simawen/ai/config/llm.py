import os 

MODEL_CONFIGS = {
    "GPT": {
        "model": "gpt-4o-mini",
        "temperature": 0.7,
        "api_key": os.getenv("OPENAI_API_KEY"),
        "model_display_name": "GPT"
    },
    "Deepseek V3 (via Fireworks AI)": {
        "model": "accounts/fireworks/models/deepseek-v3",
        "api_key": os.getenv("FIREWORKS_API_KEY"),
        "model_display_name": "Deepseek V3"
    }
}