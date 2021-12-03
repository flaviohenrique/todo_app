import React from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
} from "@chakra-ui/react";

import type { InputProps } from "@chakra-ui/react";

import type { FieldError } from "react-hook-form";

type FormInputProps = InputProps & { label: string; error?: FieldError };

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, error, ...props }, ref) => {
    return (
      <FormControl id={id} isInvalid={error !== undefined}>
        <FormLabel htmlFor={id}>{label}: </FormLabel>
        <Input ref={ref} variant="outline" mb={3} {...props} />
        <FormErrorMessage id={id}>{error?.message}</FormErrorMessage>
      </FormControl>
    );
  },
);
