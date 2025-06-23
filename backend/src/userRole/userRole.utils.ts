import { UserRole } from '@prisma/client';

export type UserStringRole = 'admin' | 'editor' | 'collaborator';

export function getRoleValue(role: UserStringRole) {
  switch (role) {
    case 'admin':
      return UserRole.ADMIN;
    case 'editor':
      return UserRole.EDITOR;
    case 'collaborator':
      return UserRole.COLLABORATOR;
  }
}
