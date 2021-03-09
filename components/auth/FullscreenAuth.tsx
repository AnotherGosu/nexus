import { Center } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AuthContent from "./AuthContent";

type Inputs = {
  email: string;
  password: string;
};

interface Props {
  type: string;
  onSubmit: (data: Inputs) => void;
}

const FullScreenAuth: React.FC<Props> = ({ type, onSubmit }) => {
  const { register, handleSubmit, formState } = useForm<Inputs>();

  return (
    <Center h="100vh" w="100%">
      <AuthContent
        as="form"
        w="100%"
        maxWidth="450px"
        p="50px"
        borderRadius={8}
        boxShadow="lg"
        formState={formState}
        type={type}
        onSubmit={handleSubmit((data: Inputs) => onSubmit(data))}
        register={register}
      />
    </Center>
  );
};

export default FullScreenAuth;
