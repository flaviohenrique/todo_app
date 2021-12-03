import React, { useEffect, useState } from "react";
import { withAuthenticatedUser } from "../lib/auth.session";
import type { AuthPageProps } from "shared";
import { Flex, Box } from "@chakra-ui/react";
import { useFlashMessage } from "ui-components";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addAvatarImage, selectAvatarImgUrl } from "../domain/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { AvatarPreview, AvatarForm, AddAvatarEventHandler, SelectAvatarEventHandler } from "../components/users";


export const getServerSideProps = withAuthenticatedUser<AuthPageProps>(async (_context, store, user) => {
  return { props: {

  }};
});

const Profile = () => {
  const dispatch = useAppDispatch();
  const flashMessage = useFlashMessage();

  const { status: loadingAddingStatus, error: addingAvatarError } = useAppSelector(
    (state) => state.users.avatarAdding
  );

  const avatarImgUrl = useAppSelector(selectAvatarImgUrl)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onSubmitHandler: AddAvatarEventHandler = async (form, data) => {
    try {
        const resultAction = await dispatch(addAvatarImage(data));
        unwrapResult(resultAction);
        setSelectedFile(null);
      } catch (error) {
        form.setError("avatar", {
          type: "manual",
          message: "Invalid avatar image",
        });
      }
  };


  const onSelectAvatarFileHandler : SelectAvatarEventHandler = (file) => {
    setSelectedFile(file);
  }
  

  useEffect(() => {
    if (addingAvatarError !== null) {
      flashMessage("error", addingAvatarError);
    }
  }, [flashMessage, addingAvatarError]);

  return (
    <Flex my={2} borderWidth="1px" >
      <Flex p={5} mx={4} my={2} shadow="md" borderWidth="1px" width="100%" alignContent="space-between" >
        <Box width="100%">
          <AvatarForm currentAvatarImgUrl={avatarImgUrl} onSelectAvatarFile={onSelectAvatarFileHandler} onSubmit={onSubmitHandler} isLoading={loadingAddingStatus == "loading"} ></AvatarForm>
        </Box>
          { (selectedFile !== null) ? (
            <AvatarPreview file={selectedFile} />
          ) : null }
      </Flex>
    </Flex>
  );
};

export default Profile;
