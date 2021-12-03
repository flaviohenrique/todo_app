import React, { useRef } from "react";
import { FormLabel, Input, Button } from "@chakra-ui/react";

import type { InputProps } from "@chakra-ui/react";

import type { FieldError } from "react-hook-form";

type FormInputProps = InputProps & {
  label?: string;
  error?: FieldError;
  image?: React.ReactNode;
};

export const FormInputFile = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, image, ...props }, _ref: any) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const setFieldRef = (e: HTMLInputElement) => {
      _ref(e);
      inputRef.current = e;
    };

    const onButtonClick = () => {
      inputRef?.current?.click();
    };

    return (
      <span>
        {label ? <FormLabel htmlFor={id}>{label}: </FormLabel> : null}
        {image}
        <Input hidden type="file" ref={setFieldRef} {...props} />
        <Button colorScheme="teal" onClick={onButtonClick}>
          Select
        </Button>
      </span>
    );
  }
);
