import { User } from '../api/users';

export function getFullName(user: User) {
  return `${user.firstName} ${user.lastName}`.trim();
}
