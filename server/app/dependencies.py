from functools import lru_cache
from app.services.llm import LLMService


@lru_cache()
def get_llm_service() -> LLMService:
    return LLMService()
