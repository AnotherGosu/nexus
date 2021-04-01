import { createStandaloneToast } from "@chakra-ui/react";

export default function responseToast(status: number, description: string) {
  const toast = createStandaloneToast();
  if (status === 200) {
    toast({
      description,
      status: "success",
      position: "bottom-right",
      duration: 3000,
      isClosable: true,
    });
  } else {
    toast({
      description: "Error occurred.",
      status: "error",
      position: "bottom-right",
      duration: 3000,
      isClosable: true,
    });
  }
}
