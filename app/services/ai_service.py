import os
from app.config import AZURE_OPENAI_KEY, AZURE_OPENAI_ENDPOINT

# Check if we have a real Azure OpenAI key
USE_AZURE = AZURE_OPENAI_KEY and AZURE_OPENAI_KEY != "dummy"

if USE_AZURE:
    from openai import AzureOpenAI

    client = AzureOpenAI(
        api_key=AZURE_OPENAI_KEY,
        azure_endpoint=AZURE_OPENAI_ENDPOINT,
        api_version="2024-02-15-preview"
    )

    def generate_summary(symptoms: str):
        """Call Azure OpenAI to summarize patient symptoms"""
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a clinical intake assistant. "
                        "Summarize symptoms clearly for a doctor. "
                        "Do NOT diagnose or suggest treatment."
                    )
                },
                {"role": "user", "content": symptoms}
            ]
        )
        return response.choices[0].message.content
else:
    # Mock function for local testing
    def generate_summary(symptoms: str):
        """Returns a mock summary for testing"""
        return f"[MOCK SUMMARY] Patient reports: {symptoms}"
