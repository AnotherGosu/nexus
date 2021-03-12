import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { RefReturn } from "utils/types";

type Props = InputProps & {
  label: string;
  register: ({ required }: { required?: string }) => RefReturn;
  error: FieldError;
  required: string;
};

const InputField: React.FC<Props> = ({
  id,
  label,
  placeholder,
  register,
  error,
  required,
  ...rest
}) => {
  return (
    <FormControl isInvalid={!!error?.message}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        {...rest}
        id={id}
        placeholder={placeholder}
        ref={register({ required })}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
