import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosApi from "../api";

export const useUpdateTodoMutation = () => {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: todosApi.update,
    onSuccess: () => {
      return queryCLient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
