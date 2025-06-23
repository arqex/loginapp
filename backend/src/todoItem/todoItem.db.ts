// CRUD DB access for TodoItem
import { PrismaClient, TodoItem } from '@prisma/client';
const prisma = new PrismaClient();

export async function createTodoItem(
  data: Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'>,
) {
  return prisma.todoItem.create({ data });
}

export async function getTodoItemById(id: string) {
  return prisma.todoItem.findUnique({ where: { id } });
}

export async function getTodoItemsByList(todoListId: string) {
  return prisma.todoItem.findMany({ where: { todoListId } });
}

export async function updateTodoItem(id: string, data: Partial<TodoItem>) {
  return prisma.todoItem.update({ where: { id }, data });
}

export async function deleteTodoItem(id: string) {
  return prisma.todoItem.delete({ where: { id } });
}
