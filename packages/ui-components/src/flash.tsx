import {
  useToast,
  AlertStatus,
} from "@chakra-ui/react";

export type FlashMessageStatus = AlertStatus

export const useFlashMessage = () => {
  const toast = useToast()

  return (status: FlashMessageStatus, message: string) => {
    return toast({
      title: message,
      status: status,
      position: "top",
      isClosable: true,
    });
  };
}
