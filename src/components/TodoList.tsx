import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Container,
  Flex,
  StackDivider,
  Text,
  VStack,
  useToast
} from "@chakra-ui/react";
import { useDeleteTodoMutationOptimistic } from "../hooks/use-delete-todo-mutation-optimistic";
import { useTodosQuery } from "../hooks/use-todos-query";
import { useUpdateTodoMutationOptimistic } from "../hooks/use-update-tosoo-mutation-optimistic";

const TodoList = () => {
  const { status, data } = useTodosQuery();
  const updateTodoMutation = useUpdateTodoMutationOptimistic();
  const deleteTodoMutation = useDeleteTodoMutationOptimistic();
  const toast = useToast();

  if (status === "loading") return <span>Loading..</span>;
  if (status === "error") return <span>Error!</span>;
  return (
    <Container maxWidth="2xl" justifyContent="center">
      <VStack
        divider={<StackDivider />}
        minHeight="md"
        backgroundColor="white"
        spacing="0"
        padding="8"
        shadow="lg"
        borderRadius="xl"
        direction="column"
        align="stretch"
      >
        <Text fontSize="4xl" textAlign="center" marginBottom="4">
          Todo List
        </Text>
        {
          // ✅ Render the list of todo items
          data.map((item) => (
            <Flex
              key={item.id}
              alignItems="center"
              justifyContent="start"
              height="16"
              padding="4"
              _hover={{
                background: "brand.50",
                ".icon": { visibility: "visible" },
              }}
            >
              <Checkbox
                size="lg"
                isChecked={item.completed}
                colorScheme="brand"
                onChange={() => {
                  // 👉 TODO: Add logic for completing a todo item
                  const mutationParams = {
                    ...item,
                    completed: !item.completed,
                  };
                  updateTodoMutation.mutate(mutationParams, {
                    onError: () => {
                      toast({
                        title: "Failed update",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom-right",
                      });
                    },
                  });
                }}
              />
              <Text marginLeft="4" fontSize="md">
                {item.description}
              </Text>
              <Button
                className="icon"
                visibility="hidden"
                marginLeft="auto"
                borderRadius="lg"
                size="xs"
                _hover={{ backgroundColor: "brand.100" }}
                colorScheme="brand"
                variant="ghost"
                onClick={() => {
                  // 👉 TODO: Add logic for deleting a todo item
                  deleteTodoMutation.mutate(item.id, {
                    onError: () => {
                      toast({
                        title: "Failed update",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom-right",
                      });
                    },
                  });
                }}
              >
                <CloseIcon boxSize={2} />
              </Button>
            </Flex>
          ))
        }
      </VStack>
    </Container>
  );
};

export default TodoList;
