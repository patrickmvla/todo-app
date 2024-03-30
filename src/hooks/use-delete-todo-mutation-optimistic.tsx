import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosApi from "../api";
import { TodoListModel } from "../api/models";

export const useDeleteTodoMutationOptimistic = () => {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: todosApi.delete,
    onMutate: async (id) => {
      await queryCLient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryCLient.getQueryData<TodoListModel>(["todos"]);

      if (previousTodos) {
        const newTodos: TodoListModel = previousTodos.filter(
          (item) => item.id !== id
        );

        queryCLient.setQueryData<TodoListModel>(["todos"], newTodos);
      }
      return { previousTodos };
    },
    onError: (err, variable, context) => {
      if (context?.previousTodos) {
        queryCLient.setQueryData<TodoListModel>(
          ["todos"],
          context.previousTodos
        );
      }
    },
    onSettled: () => {
      queryCLient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
