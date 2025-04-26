import streamlit as st

from simawen.ai.bot.constants.model import LLM_MODELS
from simawen.ai.bot.simabot import SimaBot

class App(): 
    def __init__(self):
        self.llm_model = None
        self.sima_bot = None

    def start(self):
        st.title("Sima-Wen Chatbot")

        if st.session_state.get("llm_model", None) is None:
            self.select_model_handler()
        else:
            if st.button("Switch Model"):
                self.switch_model_handler()

            self.conversation_handler()
    def select_model_handler(self):
        st.header("Select LLM Model")
        model_name = st.selectbox("Model", LLM_MODELS, index=0)
        if st.button("Start"):
            st.session_state["llm_model"] = model_name
            try:
                st.session_state["sima_bot"] = SimaBot(model_name)
                st.session_state["model_display_name"] = st.session_state["sima_bot"].get_model_display_name()
                st.rerun()
            except Exception as e:
                st.error(f"Error initializing model: {e}")
    
    def switch_model_handler(self):
        st.session_state["llm_model"] = None
        st.session_state["sima_bot"] = None
        st.rerun()

    def display_chat_history(self):
        st.markdown("""
            <style>
            .chat-bubble-user {
                background-color: #DCF8C6;
                color: #222;
                padding: 10px 15px;
                border-radius: 15px;
                margin-bottom: 5px;
                max-width: 70%;
                align-self: flex-end;
                margin-left: 30%;
            }
            .chat-bubble-bot {
                background-color: #F1F0F0;
                color: #222;
                padding: 10px 15px;
                border-radius: 15px;
                margin-bottom: 10px;
                max-width: 70%;
                align-self: flex-start;
                margin-right: 30%;
            }
            .chat-container {
                display: flex;
                flex-direction: column;
            }
            </style>
        """, unsafe_allow_html=True)

        st.markdown('<div class="chat-container">', unsafe_allow_html=True)

        if st.session_state["sima_bot"] is not None:
            chat_history = st.session_state["sima_bot"].get_chat_history()
        else:
            chat_history = []

        for chat in chat_history:
            if chat["role"] == "user":
                st.markdown(
                    f'<div class="chat-bubble-user"><b>You:</b> {chat["content"]}</div>',
                    unsafe_allow_html=True
                )
            elif chat["role"] == "assistant":
                st.markdown(
                    f'<div class="chat-bubble-bot"><b>Sima-Wen:</b> {chat["content"]}</div>',
                    unsafe_allow_html=True
                )
        st.markdown('</div>', unsafe_allow_html=True)

    def conversation_handler(self):
        st.header(f"Sima-Wen Chatbot [{st.session_state['model_display_name']}]")

        prompt = st.text_area("Enter your prompt here")

        btn_send, btn_clear = st.columns([1,1], gap="small")

        with btn_send:
            send_btn_clicked = st.button("Send")
        with btn_clear:
            clear_btn_clicked = st.button("Clear Conversation")

        self.display_chat_history()


        if send_btn_clicked:
            if prompt:
                st.session_state["sima_bot"].invoke(prompt)
                st.rerun()

        if clear_btn_clicked:
            st.session_state["sima_bot"].clear_chat_history()
            st.rerun()


