def test_create_conversation(

    client,

    admin_headers

):

    response = client.post(

        "/conversations/",

        headers=admin_headers,

        json={

            "title": "Pytest Conversation"

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert "conversation_id" in data

    assert data["title"] == "Pytest Conversation"

    assert "created_at" in data

    assert "updated_at" in data


def test_get_my_conversations(

    client,

    admin_headers

):

    response = client.get(

        "/conversations/",

        headers=admin_headers

    )

    assert response.status_code == 200

    data = response.json()

    assert "conversations" in data

    assert isinstance(

        data["conversations"],

        list

    )

def test_get_conversation_by_id(

    client,

    admin_headers

):

    create_response = client.post(

        "/conversations/",

        headers=admin_headers,

        json={

            "title": "Conversation Details"

        }

    )

    conversation_id = (

        create_response.json()["conversation_id"]

    )

    response = client.get(

        f"/conversations/{conversation_id}",

        headers=admin_headers

    )

    assert response.status_code == 200

    data = response.json()

    assert (

        data["conversation_id"]

        == conversation_id

    )

    assert (

        data["title"]

        == "Conversation Details"

    )

    assert "messages" in data

def test_rename_conversation(

    client,

    admin_headers

):

    create_response = client.post(

        "/conversations/",

        headers=admin_headers,

        json={

            "title": "Old Title"

        }

    )

    conversation_id = (

        create_response.json()["conversation_id"]

    )

    response = client.patch(

        f"/conversations/{conversation_id}",

        headers=admin_headers,

        json={

            "title": "New Title"

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert data["title"] == "New Title"

def test_delete_conversation(

    client,

    admin_headers

):

    create_response = client.post(

        "/conversations/",

        headers=admin_headers,

        json={

            "title": "Delete Me"

        }

    )

    conversation_id = (

        create_response.json()["conversation_id"]

    )

    response = client.delete(

        f"/conversations/{conversation_id}",

        headers=admin_headers

    )

    assert response.status_code == 200

    assert (

        response.json()["message"]

        == "Conversation deleted successfully."

    )

