// CRUD DB access for TodoList
import { TodoList } from '@prisma/client';
import { getPrismaClient } from '../../../prismaclient';

export async function createTodoList(
  data: Omit<TodoList, 'id' | 'createdAt' | 'updatedAt'>,
) {
  return getPrismaClient().todoList.create({ data });
}

export async function getTodoListById(id: string) {
  return getPrismaClient().todoList.findUnique({
    where: { id },
    include: { items: true },
  });
}

export async function getTodoListsByAccount(accountId: string) {
  return getPrismaClient().todoList.findMany({
    where: { accountId },
    include: { items: true },
  });
}

export async function updateTodoList(id: string, data: Partial<TodoList>) {
  return getPrismaClient().todoList.update({ where: { id }, data });
}

export async function deleteTodoList(id: string) {
  return getPrismaClient().todoList.delete({ where: { id } });
}
