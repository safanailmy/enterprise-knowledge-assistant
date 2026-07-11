import pytest

from fastapi.testclient import TestClient

from app.main import app
from unittest.mock import Mock


@pytest.fixture
def client():

    with TestClient(app) as test_client:

        yield test_client


@pytest.fixture
def admin_token(client):

    response = client.post(

        "/users/login",

        data={

            "username": "AdminTest@gmail.com",

            "password": "AdminTest1234"

        }

    )

    assert response.status_code == 200

    return response.json()["access_token"]


@pytest.fixture
def admin_headers(admin_token):

    return {

        "Authorization": f"Bearer {admin_token}"

    }


@pytest.fixture
def mock_llm(mocker):

    from app.services.llm.llm_service import (
        llm_service
    )

    mocker.patch.object(

        llm_service,

        "generate",

        return_value=Mock(

            answer="This is a mocked response."

        )

    )