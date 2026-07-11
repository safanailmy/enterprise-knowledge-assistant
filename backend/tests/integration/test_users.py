def test_get_my_profile(

    client,

    admin_headers

):

    response = client.get(

        "/users/me",

        headers=admin_headers

    )

    assert response.status_code == 200

    data = response.json()

    assert data["email"].lower() == "admintest@gmail.com"

    assert data["role"] == "admin"


def test_get_my_profile_without_token(

    client

):

    response = client.get(

        "/users/me"

    )

    assert response.status_code == 401


def test_admin_endpoint(

    client,

    admin_headers

):

    response = client.get(

        "/users/admin-test",

        headers=admin_headers

    )

    assert response.status_code == 200

    data = response.json()

    assert data["message"] == "Admin access granted."