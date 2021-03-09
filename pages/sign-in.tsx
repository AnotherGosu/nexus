import { useToast } from "@chakra-ui/react";
import { useAuth } from "../utils/auth";
import { useRouter } from "next/router";
import FullScreenAuth from "../components/auth/FullscreenAuth";

const SignIn = () => {
  const auth = useAuth();
  const toast = useToast();
  const router = useRouter();

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await auth.signIn(email, password);
      router.push("/storage");
    } catch (err) {
      toast({
        title: "An error occured",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return <FullScreenAuth type="Sign In" onSubmit={signIn} />;
};

export default SignIn;
