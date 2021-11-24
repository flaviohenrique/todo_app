import React, { VFC } from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import {
  Box,
  FormControl,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ICreateTodo } from "shared";

type TodoFormProps = {
  onSubmit: onCreateTodoHandler;
  isLoading: boolean;
};

export type onCreateTodoHandler = (
  data: ICreateTodo,
  form: UseFormReturn<ICreateTodo, object>
) => void;

const TodoForm: VFC<TodoFormProps> = ({ onSubmit, isLoading = false }) => {
  const form = useForm<ICreateTodo>();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmitHandler: SubmitHandler<ICreateTodo> = async (data) => {
    onSubmit(data, form);
  };

  return (
    <Box p={5} mx={4} my={2} shadow="md" borderWidth="1px">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormControl as="fieldset" isInvalid={errors.description !== undefined}>
          <Input
            placeholder="Description..."
            mb={3}
            {...register("description", { required: true })}
          />
          <FormErrorMessage id="description">
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="teal"
          type="submit"
          isLoading={isLoading || isSubmitting}
        >
          Create
        </Button>
      </form>
    </Box>
  );
};

export default TodoForm;
