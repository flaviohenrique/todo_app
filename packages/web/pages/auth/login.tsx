import Router from "next/router";
import { ClientApi, ResultError } from "../../api";
import { Flex, Heading, Avatar, Box, VStack, Link } from "@chakra-ui/react";
import Form, { onSubmitHandler } from "../../components/login/Form";
import { Layouts } from "../../components/layouts";
import NextLink from "next/link";

const Login = () => {
  const api = new ClientApi();

  const onSubmitHandler: onSubmitHandler = async (data, form) => {
    const result = await api.doLogin(data);

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
      <VStack spacing="5">
        <Avatar bg="teal.500" />
        <Heading>Welcome</Heading>
        <Form onSubmit={onSubmitHandler}></Form>
        <Box>
          New to us? &nbsp;
          <NextLink href="/auth/signup" passHref>
            <Link color="teal.500">Sign Up</Link>
          </NextLink>
        </Box>
      </VStack>
    </Flex>
  );
};

Login.layout = Layouts.Guest;

export default Login;
