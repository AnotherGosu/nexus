import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

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
