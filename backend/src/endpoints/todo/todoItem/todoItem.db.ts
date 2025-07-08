// CRUD DB access for TodoItem
import { TodoItem } from '@prisma/client';
import { getPrismaClient } from '../../../prismaclient';

export async function createTodoItem(
  data: Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'>,
) {
  return getPrismaClient().todoItem.create({ data });
}

export async function getTodoItemById(id: string) {
  return getPrismaClient().todoItem.findUnique({ where: { id } });
}

export async function getTodoItemsByList(todoListId: string) {
  return getPrismaClient().todoItem.findMany({ where: { todoListId } });
}

export async function updateTodoItem(id: string, data: Partial<TodoItem>) {
  return getPrismaClient().todoItem.update({ where: { id }, data });
}

export async function deleteTodoItem(id: string) {
  return getPrismaClient().todoItem.delete({ where: { id } });
}
