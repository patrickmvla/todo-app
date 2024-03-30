import { useMutation, useQueryClient } from "@tanstack/react-query";
import todosApi from "../api";

export const useCreateTodoMutation = () => {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: todosApi.create,
    onSuccess: () => {
      return queryCLient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
