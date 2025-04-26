from dotenv import load_dotenv
import simawen.ui.webapp.app as app

if __name__ == "__main__":
    load_dotenv()
    app = app.App()
    app.start()
