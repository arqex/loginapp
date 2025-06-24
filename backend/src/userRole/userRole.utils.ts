import { UsersOnAccountRole } from '@prisma/client';

export type UserStringRole = 'admin' | 'editor' | 'collaborator';

export function getRoleValue(role: UserStringRole) {
  switch (role) {
    case 'admin':
      return UsersOnAccountRole.ADMIN;
    case 'editor':
      return UsersOnAccountRole.EDITOR;
    case 'collaborator':
      return UsersOnAccountRole.COLLABORATOR;
  }
}
