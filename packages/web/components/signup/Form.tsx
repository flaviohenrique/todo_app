import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import React, { VFC } from "react";
import { Box, Button } from "@chakra-ui/react";

import { FormInput } from "ui-components";

import { ICreateUser } from "shared";

export type onSubmitHandler = (
  data: ICreateUser,
  form: UseFormReturn<ICreateUser, object>
) => void;

interface IProps {
  onSubmit: onSubmitHandler;
}

const SignupForm: VFC<IProps> = ({ onSubmit }) => {
  const form = useForm<ICreateUser>();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmitHandler: SubmitHandler<ICreateUser> = async (data) => {
    onSubmit(data, form);
  };

  return (
    <Box bg="gray.50" p={6} rounded={6} width="100%">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormInput
          id="name"
          label="Name"
          placeholder="John Apple Seed"
          {...register("name", { required: true })}
          error={errors.name}
        />
        <FormInput
          id="email"
          label="Email"
          placeholder="some-email@gmail.com"
          defaultValue="flavio.henrique85@gmail.com"
          type="email"
          {...register("email", { required: true })}
          error={errors.email}
        />
        <FormInput
          id="password"
          label="Password"
          placeholder="*******"
          defaultValue="123456"
          {...register("password", { required: true })}
          error={errors.password}
        />
        <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
          Create
        </Button>
      </form>
    </Box>
  );
};

export default SignupForm;
