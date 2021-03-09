import { useToast } from "@chakra-ui/react";
import { useAuth } from "../utils/auth";
import { useRouter } from "next/router";
import FullScreenAuth from "../components/auth/FullscreenAuth";

const SignUp = () => {
  const auth = useAuth();
  const toast = useToast();
  const router = useRouter();

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await auth.signUp(email, password);
      toast({
        title: "Success",
        description: "Your account has been created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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

  return <FullScreenAuth type="Sign Up" onSubmit={signUp} />;
};

export default SignUp;
