import { useToast, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "utils/auth";
import AuthModal from "./AuthModal";

type AdditionalProps = {
  triggerModal: () => void;
};

const withAuthModal = <P extends AdditionalProps>(Component: React.FC<P>) => (
  props: P
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useAuth();
  const toast = useToast();
  const router = useRouter();

  const signIn = async ({ email, password }) => {
    try {
      await auth.signIn(email, password);
      router.push("/storage");
    } catch (err) {
      toast({
        title: "An error occured.",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const triggerMoodal = () => {
    auth.userId ? router.push("/storage") : onOpen();
  };

  return (
    <>
      <AuthModal
        isOpen={isOpen}
        onClose={onClose}
        type="Sign in"
        onSubmit={signIn}
      />
      <Component triggerModal={triggerMoodal} {...props} />
    </>
  );
};

export default withAuthModal;
