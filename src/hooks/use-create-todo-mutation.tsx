import { useMutation } from "@tanstack/react-query";
import todosApi from "../api";

export const useCreateTodoMutation = () => {
  return useMutation({mutationFn: todosApi.create})
};
