import Router from "next/router";
import { ClientApi } from "../../api/client";
import { ResultError } from "../../lib/http.client";
import { Flex, Heading } from "@chakra-ui/react";
import Form, { onSubmitHandler } from "../../components/login/Form";
import GuestLayout from "../../components/layouts/GuestLayout";
import { ReactElement } from "react";

const Login = () => {
  const clientApi = new ClientApi();

  const onSubmitHandler: onSubmitHandler = async (data, form) => {
    const result = await clientApi.doLogin(data);

    if ((result as ResultError).message !== undefined) {
      form.setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
    } else {
      Router.push("/");
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.50" p={12} rounded={6}>
        <Heading>My Todo App</Heading>
        <Form onSubmit={onSubmitHandler}></Form>
      </Flex>
    </Flex>
  );
};

Login.layout = "guest";

export default Login;
