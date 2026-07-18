import { login } from "../api/auth";

export default function Test() {

  async function handleClick() {

    try {

      const response = await login({

        email: "admin@example.com",

        password: "Admin@123",

      });

      console.log(response);

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <button onClick={handleClick}>

      Test Login

    </button>

  );

}