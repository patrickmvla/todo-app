import { useMutation } from "@tanstack/react-query";
import todosApi from "../api";

export const useUpdateTodoMutation = () => {
  return useMutation({ mutationFn: todosApi.update });
};
