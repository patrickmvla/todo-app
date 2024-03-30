import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosApi from "../api";
import { TodoListModel } from "../api/models";

export const useUpdateTodoMutationOptimistic = () => {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: todosApi.update,
    onMutate: async (updateTodo) => {
      await queryCLient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryCLient.getQueryData<TodoListModel>(["todos"]);

      if (previousTodos) {
        const newTodos: TodoListModel = previousTodos.map((item) => {
          if (item.id === updateTodo.id) {
            return updateTodo;
          } else {
            return item;
          }
        });

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
