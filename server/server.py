from app import app
from dotenv import load_dotenv, dotenv_values
import os

load_dotenv()

# DB config
port = os.getenv("PORT")

if __name__ == "__main__":
    app.run(debug=True, port=port)  
 