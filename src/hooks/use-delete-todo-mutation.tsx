import { useMutation } from "@tanstack/react-query"
import todosApi from "../api"

export const useDeleteTodoMutation = () => {
    return useMutation({mutationFn: todosApi.delete})
}