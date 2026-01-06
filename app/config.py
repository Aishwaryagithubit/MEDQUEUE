import os
from dotenv import load_dotenv


load_dotenv()


AZURE_OPENAI_KEY = os.getenv("AZURE_OPENAI_KEY")
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")

AZURE_SQL_CONNECTION = os.getenv("AZURE_SQL_CONNECTION")

AZURE_BLOB_CONNECTION = os.getenv("AZURE_BLOB_CONNECTION")
AZURE_BLOB_CONTAINER = "patient-images"
