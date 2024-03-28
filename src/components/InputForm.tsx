import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCreateTodoMutation } from "../hooks/use-create-todo-mutation";

const InputForm = () => {
  const [input, setInput] = useState("");
  const createTodoMutation = useCreateTodoMutation();

  const toast = useToast();

  return (
    <InputGroup size="lg" w="2xl">
      <Input
        focusBorderColor="brand.300"
        type="text"
        placeholder="Enter new todo"
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <InputRightElement width="4.5rem">
        <Button
          colorScheme="brand"
          isLoading={createTodoMutation.isLoading}
          onClick={() => {
            // 👉 TODO: Add logic for creating a new todo item
            if (input === "") return;
            createTodoMutation.mutate(input, {
              onSuccess: () => {
                toast({
                  title: "New todo item added",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom-right",
                });
              },
            });
          }}
        >
          Add
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default InputForm;
