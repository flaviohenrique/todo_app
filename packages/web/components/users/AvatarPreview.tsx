import React, { VFC } from "react";
import { AspectRatio, Box, Image } from "@chakra-ui/react";

type AvatarPreviewProps = {
  file: File;
};

export const AvatarPreview: VFC<AvatarPreviewProps> = ({ file }) => {
  return (
    <Box width="120px" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <AspectRatio maxW="120px" ratio={1}>
        <Image src={URL.createObjectURL(file)} alt={file.name} />
      </AspectRatio>
    </Box>
  );
};
