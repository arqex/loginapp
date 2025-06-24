-- Insert test data for the collaborative todo-list app

-- Insert Users
INSERT INTO `User` (`id`, `createdAt`, `updatedAt`, `email`, `meta`) VALUES
  ('user1', NOW(), NOW(), 'admin@example.com', '{}'),
  ('user2', NOW(), NOW(), 'editor@example.com', '{}'),
  ('user3', NOW(), NOW(), 'contributor@example.com', '{}'),
  ('user4', NOW(), NOW(), 'simple@example.com', '{}');

-- Insert Accounts
INSERT INTO `Account` (`id`, `createdAt`, `updatedAt`, `meta`) VALUES
  ('account1', NOW(), NOW(), '{"name": "Collaboration acc"}'),
  ('account2', NOW(), NOW(), '{"name": "simple acc"}');

-- Insert UsersOnAccount (roles: ADMIN, EDITOR, COLLABORATOR)
INSERT INTO `UsersOnAccount` (`userId`, `accountId`, `role`, `createdAt`, `updatedAt`) VALUES
  ('user1', 'account1', 'ADMIN', NOW(), NOW()),
  ('user2', 'account1', 'EDITOR', NOW(), NOW()),
  ('user3', 'account1', 'COLLABORATOR', NOW(), NOW()),
  ('user4', 'account2', 'ADMIN', NOW(), NOW());

-- Insert TodoList
INSERT INTO `TodoList` (`id`, `accountId`, `createdAt`, `updatedAt`, `name`) VALUES
  ('list1', 'account1', NOW(), NOW(), 'Demo List');

-- Insert TodoItems
INSERT INTO `TodoItem` (`id`, `todoListId`, `createdAt`, `updatedAt`, `title`, `completed`) VALUES
  ('item1', 'list1', NOW(), NOW(), 'First task', false),
  ('item2', 'list1', NOW(), NOW(), 'Second task', true);

-- Insert AuthTokens for test users
INSERT INTO `AuthToken` (`key`, `createdAt`, `expiresAt`, `type`, `userId`, `meta`) VALUES
  ('admin@example.com', NOW(), NULL, 'EMAIL_LOGIN', 'user1', '{"vc": "NRVTF1","hash": "30e783ada2a00b2f5f61a4fb462b8e30b619d3b49d4e1b1b55b102ccd7fcef53","salt": "6f1ed61087925e839ed482912995b81d87d592d5a780ca109e940ebd8b361236"}'),
  ('editor@example.com', NOW(), NULL, 'EMAIL_LOGIN', 'user2', '{"vc": "NRVTF1","hash": "30e783ada2a00b2f5f61a4fb462b8e30b619d3b49d4e1b1b55b102ccd7fcef53","salt": "6f1ed61087925e839ed482912995b81d87d592d5a780ca109e940ebd8b361236"}'),
  ('contributor@example.com', NOW(), NULL, 'EMAIL_LOGIN', 'user3', '{"vc": "NRVTF1","hash": "30e783ada2a00b2f5f61a4fb462b8e30b619d3b49d4e1b1b55b102ccd7fcef53","salt": "6f1ed61087925e839ed482912995b81d87d592d5a780ca109e940ebd8b361236"}'),
  ('simple@example.com', NOW(), NULL, 'EMAIL_LOGIN', 'user4', '{"vc": "NRVTF1","hash": "30e783ada2a00b2f5f61a4fb462b8e30b619d3b49d4e1b1b55b102ccd7fcef53","salt": "6f1ed61087925e839ed482912995b81d87d592d5a780ca109e940ebd8b361236"}');
