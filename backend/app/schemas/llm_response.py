from pydantic import BaseModel


class LLMResponse(BaseModel):

    success: bool

    answer: str

    model: str

    prompt_tokens: int

    completion_tokens: int

    finish_reason: str

    