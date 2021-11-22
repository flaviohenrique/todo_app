import React, { VFC } from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { Box, FormControl, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import { ITodo } from "shared";

type TodoFormProps = {
  onSubmit: onCreateTodoHandler;
};

export type onCreateTodoHandler = (
  data: Pick<ITodo, "description">,
  form: UseFormReturn<Pick<ITodo, "description">, object>
) => void;

const TodoForm: VFC<TodoFormProps> = ({ onSubmit }) => {
  const form = useForm<Pick<ITodo, "description">>();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmitHandler: SubmitHandler<Pick<ITodo, "description">> = async (data) => {
    onSubmit(data, form);
  };

  return (
    <Box p={5} mx={4} my={2} shadow="md" borderWidth="1px">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormControl as="fieldset" isInvalid={errors.description !== undefined} >
          <Input placeholder="Description..." mb={3} {...register("description", { required: true })} />
          <FormErrorMessage id="description">
            {errors.description && errors.description.message}
          </FormErrorMessage>                    
        </FormControl>
        <Button colorScheme="teal" type="submit" isLoading={isSubmitting} >Create</Button>        
      </form>
    </Box>
  );
};

export default TodoForm;
