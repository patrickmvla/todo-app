import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosApi from "../api";

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todosApi.delete,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
