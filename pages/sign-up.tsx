import { useToast } from "@chakra-ui/react";
import { useAuth } from "contexts/auth";
import { useRouter } from "next/router";
import FullScreenAuth from "components/auth/FullscreenAuth";
import axios from "axios";

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
      await axios.get("/api/auth/sign-up");
      toast({
        title: "Success",
        description: "Your account has been created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/storage/files");
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
