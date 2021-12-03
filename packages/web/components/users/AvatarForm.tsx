import React, { useState, VFC } from "react";
import { Button, FormControl, FormHelperText, HStack, FormLabel, FormErrorMessage, Avatar } from "@chakra-ui/react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { FormInputFile } from "ui-components"


export type AddAvatarEventHandler = (
  form: UseFormReturn<IAddAvatar, object>,
  data: File,
) => void;

export type SelectAvatarEventHandler = (
  file: File | null
) => void;

export type IAddAvatar = {
  avatar: string
}

type AvatarFormProps = {
  onSubmit: AddAvatarEventHandler;
  onSelectAvatarFile: SelectAvatarEventHandler;
  isLoading: boolean;
  currentAvatarImgUrl: string;
};

export const AvatarForm: VFC<AvatarFormProps> = ({ onSubmit, onSelectAvatarFile, currentAvatarImgUrl, isLoading = false }) => {
  const form = useForm<IAddAvatar>();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const [selectedFile, setSelectedFile] = useState<File | null>(null)


  const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.item(0) || null

    setSelectedFile(file)
    onSelectAvatarFile(file)
  }
  
  const onSubmitHandler: SubmitHandler<IAddAvatar> = async (_data, event) => {
    event?.preventDefault();

    if(selectedFile) {
      onSubmit(form, selectedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormControl width="100%" isInvalid={errors.avatar !== undefined}>
        <FormLabel as="legend">My Avatar</FormLabel>
        <HStack spacing={4}>
          <Avatar bg="teal.500" src={currentAvatarImgUrl} />
          <FormInputFile {...register("avatar", { required: true, onChange: onChangeFile })} />
          <Button type="submit" colorScheme="teal" isLoading={isLoading || isSubmitting} >
            Submit
          </Button>
        </HStack>
        <FormErrorMessage id="description">
          {errors.avatar && errors.avatar.message}
        </FormErrorMessage>              
        { (selectedFile !== null) ? (
            <FormHelperText>{ selectedFile.name }</FormHelperText>
        ) : null}
      </FormControl>
    </form>
  );
};
