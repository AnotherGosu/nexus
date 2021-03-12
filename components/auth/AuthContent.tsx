import { VStack, Heading, Button, StackProps } from "@chakra-ui/react";
import { FormState } from "react-hook-form";
import InputField from "../common/InputField";
import { RefReturn } from "utils/types";

type Props = StackProps & {
  register: ({ required }: { required?: string }) => RefReturn;
  formState: FormState<Record<string, any>>;
  type: string;
};

const AuthContent: React.FC<Props> = ({
  register,
  formState,
  type,
  ...rest
}) => {
  return (
    <VStack {...rest}>
      <Heading>{type}</Heading>
      <VStack spacing={4} w="100%">
        <InputField
          id="email"
          name="email"
          label="Email"
          placeholder="useremail@mail.com"
          error={formState.errors.email}
          register={register}
          required="Please enter your email"
        />
        <InputField
          id="password"
          name="password"
          placeholder="********"
          label="Password"
          type="password"
          error={formState.errors.password}
          register={register}
          required="Please enter your password"
        />
        <Button
          type="submit"
          w="100%"
          colorScheme="teal"
          isLoading={formState.isSubmitting}
        >
          {type}
        </Button>
      </VStack>
    </VStack>
  );
};

export default AuthContent;
