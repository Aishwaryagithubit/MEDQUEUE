import os
from app.config import AZURE_BLOB_CONNECTION, AZURE_BLOB_CONTAINER

# Check if we have a real Azure connection
USE_AZURE = AZURE_BLOB_CONNECTION and AZURE_BLOB_CONNECTION != "dummy"

if USE_AZURE:
    from azure.storage.blob import BlobServiceClient
    blob_service = BlobServiceClient.from_connection_string(AZURE_BLOB_CONNECTION)
    container = blob_service.get_container_client(AZURE_BLOB_CONTAINER)

    def upload_image(file, path):
        """Uploads image to Azure Blob Storage"""
        blob = container.get_blob_client(path)
        blob.upload_blob(file, overwrite=True)
        print(f"[Azure] Uploaded {path}")
else:
    # Mock function for local testing
    def upload_image(file, path):
        """Mocks image upload locally"""
        print(f"[MOCK] Uploaded {path} locally (no Azure used)")
