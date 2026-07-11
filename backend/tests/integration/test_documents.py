def test_get_document_by_id(

    client,

    admin_headers

):

    response = client.get(

        "/documents/",

        headers=admin_headers

    )

    assert response.status_code == 200

    documents = response.json()["documents"]

    assert len(documents) > 0

    document_id = documents[0]["document_id"]

    response = client.get(

        f"/documents/{document_id}",

        headers=admin_headers

    )

    assert response.status_code == 200

    data = response.json()

    assert (

        data["document_id"]

        == document_id

    )


def test_search_documents(

    client,

    admin_headers

):

    response = client.get(

        "/documents/search",

        headers=admin_headers,

        params={

            "department": "HR"

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert "documents" in data

    assert "page" in data

    assert "total" in data

    assert isinstance(

        data["documents"],

        list

    )

def test_search_ready_documents(

    client,

    admin_headers

):

    response = client.get(

        "/documents/search",

        headers=admin_headers,

        params={

            "status": "READY"

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(

        data["documents"],

        list

    )

    for document in data["documents"]:

        assert document["status"] == "READY"

def test_search_by_filename(

    client,

    admin_headers

):

    response = client.get(

        "/documents/search",

        headers=admin_headers,

        params={

            "query": "HR"

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(

        data["documents"],

        list

    )

def test_download_document(

    client,

    admin_headers

):

    response = client.get(

        "/documents/",

        headers=admin_headers

    )

    documents = response.json()["documents"]

    ready_document = next(

        document

        for document in documents

        if document["status"] == "READY"

    )

    document_id = ready_document["document_id"]

        

    response = client.get(

        f"/documents/{document_id}/download",

        headers=admin_headers

    )

    assert response.status_code == 200

    assert (

        "application/pdf"

        in response.headers["content-type"]

    )