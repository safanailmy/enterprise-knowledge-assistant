def test_login_success(client):

    response = client.post(

        "/users/login",

        data={

            "username": "AdminTest@gmail.com",

            "password": "AdminTest1234"

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data

    assert data["token_type"].lower() == "bearer"


def test_login_invalid_password(client):

    response = client.post(

        "/users/login",

        data={

            "username": "admintest@gmail.com",

            "password": "wrongpassword"

        }

    )

    assert response.status_code == 401


def test_login_unknown_email(client):

    response = client.post(

        "/users/login",

        data={

            "username": "unknown@gmail.com",

            "password": "password123"

        }

    )

    assert response.status_code == 401