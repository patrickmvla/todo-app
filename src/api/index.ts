import { TodoItemModel, TodoListModel } from "./models";

// The base url of our backend REST API.
const baseUrl = "api/todos";

/**
 * Client for making `fetch` calls to our backend REST API.
 */
const todosApi = {
  /**
   * Lists all the todo items.
   */
  async list(): Promise<TodoListModel> {
    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error(
        `An error occured listing todo items! status: ${response.status}`
      );
    }

    const todos: TodoListModel = await response.json();
    return todos;
  },

  /**
   * Creates a new todo item.
   * Note that the `id` does not need to be sent by the client, it should be generated by the backend.
   * The `completed` boolean is also omitted, because it is set to `false` by default.
   */
  async create(description: string): Promise<void> {
    const response = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      throw new Error(
        `An error occured creating new todo item! status: ${response.status}`
      );
    }
  },

  /**
   * Updates a todo item by `id`.
   * For example, this endpoint can be used to set `completed = true` for a todo item.
   */
  async update(updatedTodo: TodoItemModel): Promise<void> {
    const { id, ...rest } = updatedTodo;

    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(rest),
    });

    if (!response.ok) {
      throw new Error(
        `An error occured updating a todo item! status: ${response.status}`
      );
    }
  },

  /**
   * Deletes a todo item by `id`.
   */
  async delete(id: string): Promise<void> {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `An error occured deleting a todo item! status: ${response.status}`
      );
    }
  },
} as const;

export default todosApi;
