from google import genai

from app.core.settings import settings

from app.schemas.llm_response import (
    LLMResponse
)


class LLMService:

    def __init__(self):

        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    def generate(
        self,
        prompt: str
    ) -> LLMResponse:

        try:

            response = self.client.models.generate_content(

                model=settings.GEMINI_MODEL,

                contents=prompt

            )

            usage = response.usage_metadata

            return LLMResponse(

                success=True,

                answer=response.text,

                model=settings.GEMINI_MODEL,

                prompt_tokens=usage.prompt_token_count
                if usage else 0,

                completion_tokens=usage.candidates_token_count
                if usage else 0,

                finish_reason=str(
                    response.candidates[0].finish_reason
                )
                if response.candidates
                else "UNKNOWN"

            )

        except Exception as e:

            print()

            print("========== GEMINI ERROR ==========")

            print(e)

            print("==================================")

            print()


            return LLMResponse(

                success=False,

                answer="Sorry, the AI service is temporarily unavailable.",

                model=settings.GEMINI_MODEL,

                prompt_tokens=0,

                completion_tokens=0,

                finish_reason="ERROR"

            )


llm_service = LLMService()