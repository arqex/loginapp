// CRUD DB access for TodoList
import { PrismaClient, TodoList } from '@prisma/client';
const prisma = new PrismaClient();

export async function createTodoList(
  data: Omit<TodoList, 'id' | 'createdAt' | 'updatedAt'>,
) {
  return prisma.todoList.create({ data });
}

export async function getTodoListById(id: string) {
  return prisma.todoList.findUnique({
    where: { id },
    include: { items: true },
  });
}

export async function getTodoListsByAccount(accountId: string) {
  return prisma.todoList.findMany({
    where: { accountId },
    include: { items: true },
  });
}

export async function updateTodoList(id: string, data: Partial<TodoList>) {
  return prisma.todoList.update({ where: { id }, data });
}

export async function deleteTodoList(id: string) {
  return prisma.todoList.delete({ where: { id } });
}
