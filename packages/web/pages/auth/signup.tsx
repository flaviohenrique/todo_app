import Router from "next/router";
import { ClientApi, ResultError } from "../../services";
import { Flex, Heading, Avatar, Box, VStack, Link } from "@chakra-ui/react";
import Form, { onSubmitHandler } from "../../components/signup/Form";
import { Layouts } from "../../components/layouts";
import NextLink from "next/link";
import { useFlashMessage } from "ui-components";
import { IUser } from "shared";

const SignUp = () => {
  const api = new ClientApi();
  const flashMessage = useFlashMessage();

  const onSubmitHandler: onSubmitHandler = async (data, form) => {
    const result = await api.createUser(data);

    if ((result as ResultError).message !== undefined) {
      form.setError("email", {
        type: "manual",
        message: (result as ResultError).message,
      });
    } else {
      flashMessage("success", `User ${(result as IUser).name}. Please log in`);
      Router.push("/auth/login");
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <VStack spacing="5">
        <Avatar bg="teal.500" />
        <Heading>Do your registration</Heading>
        <Form onSubmit={onSubmitHandler}></Form>
        <Box>
          Already have an account? &nbsp;
          <NextLink href="/auth/login" passHref>
            <Link color="teal.500">Log In</Link>
          </NextLink>
        </Box>
      </VStack>
    </Flex>
  );
};

SignUp.layout = Layouts.Guest;

export default SignUp;
