def test_chat_success(

    client,

    admin_headers,

    mock_llm

):

    create = client.post(

        "/conversations/",

        headers=admin_headers,

        json={

            "title": "Chat Test"

        }

    )

    conversation_id = (

        create.json()["conversation_id"]

    )

    response = client.post(

        "/chat/",

        headers=admin_headers,

        json={

            "conversation_id": conversation_id,

            "question": "How long is maternity leave?"

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert "answer" in data

    assert "sources" in data

    assert isinstance(

        data["sources"],

        list

    )

    assert (

        len(data["sources"]) > 0

    )

def test_chat_invalid_conversation(

    client,

    admin_headers,

    mock_llm

):

    response = client.post(

        "/chat/",

        headers=admin_headers,

        json={

            "conversation_id":

            "00000000-0000-0000-0000-000000000000",

            "question":

            "Hello"

        }

    )

    assert response.status_code == 404

def test_chat_without_token(

    client,

    mock_llm

):

    response = client.post(

        "/chat/",

        json={

            "conversation_id":

            "123",

            "question":

            "Hello"

        }

    )

    assert response.status_code == 401

def test_chat_returns_sources(

    client,

    admin_headers,

    mock_llm

):

    conversation = client.post(

        "/conversations/",

        headers=admin_headers,

        json={

            "title": "Citation Test"

        }

    )

    conversation_id = (

        conversation.json()["conversation_id"]

    )

    response = client.post(

        "/chat/",

        headers=admin_headers,

        json={

            "conversation_id": conversation_id,

            "question": "What is maternity leave?"

        }

    )

    assert response.status_code == 200

    sources = response.json()["sources"]

    assert isinstance(

        sources,

        list

    )

    assert len(sources) > 0

    source = sources[0]

    assert "document_id" in source

    assert "filename" in source

    assert "version" in source

    assert "chunk_index" in source


def test_chat_conversation_memory(

    client,

    admin_headers,

    mock_llm

):

    conversation = client.post(

        "/conversations/",

        headers=admin_headers,

        json={

            "title": "Memory Test"

        }

    )

    conversation_id = (

        conversation.json()["conversation_id"]

    )

    response = client.post(

        "/chat/",

        headers=admin_headers,

        json={

            "conversation_id": conversation_id,

            "question": "What is maternity leave?"

        }

    )

    assert response.status_code == 200

    response = client.post(

        "/chat/",

        headers=admin_headers,

        json={

            "conversation_id": conversation_id,

            "question": "How long is it?"

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert "answer" in response.json()

    assert data["answer"] == "This is a mocked response."

def test_chat_unknown_question(

    client,

    admin_headers,

    mock_llm

):

    conversation = client.post(

        "/conversations/",

        headers=admin_headers,

        json={

            "title": "Unknown Test"

        }

    )

    conversation_id = (

        conversation.json()["conversation_id"]

    )

    response = client.post(

        "/chat/",

        headers=admin_headers,

        json={

            "conversation_id": conversation_id,

            "question": "Who invented Facebook?"

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert data["answer"] == "This is a mocked response."

def test_chat_multiple_sources(

    client,

    admin_headers,

    mock_llm

):

    conversation = client.post(

        "/conversations/",

        headers=admin_headers,

        json={

            "title": "Sources Test"

        }

    )

    conversation_id = (

        conversation.json()["conversation_id"]

    )

    response = client.post(

        "/chat/",

        headers=admin_headers,

        json={

            "conversation_id": conversation_id,

            "question": "Explain the maternity leave policy."

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert len(data["sources"]) >= 1