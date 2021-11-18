import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import React, { FunctionComponent } from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { IUserCredentials } from "shared";

export type onSubmitHandler = (
  data: IUserCredentials,
  form: UseFormReturn<IUserCredentials, object>,
) => void;

interface IProps {
  onSubmit: onSubmitHandler;
}

const LoginForm: FunctionComponent<IProps> = ({ onSubmit }) => {
  const form = useForm<IUserCredentials>();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmitHandler: SubmitHandler<IUserCredentials> = async (data) => {
    onSubmit(data, form);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormControl id="email" isInvalid={errors.email !== undefined}>
        <FormLabel htmlFor="email">Email: </FormLabel>
        <Input
          placeholder="some-email@gmail.com"
          type="email"
          variant="outline"
          mb={3}
          {...register("email", { required: true })}
        />
        <FormErrorMessage id="email">
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl id="password" isInvalid={errors.password !== undefined}>
        <FormLabel htmlFor="password">Password: </FormLabel>
        <Input
          placeholder="*******"
          variant="outline"
          mb={6}
          type="password"
          {...register("password", { required: true })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
