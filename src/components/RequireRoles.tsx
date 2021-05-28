import { ReactNode } from 'react';
import { UserRole } from '../api/users';
import { useUserStore } from '../stores/userStore';

export interface RequireRolesProps {
  children?: ReactNode;
  fallback?: ReactNode;
  roles?: UserRole | Array<UserRole>;
}

export default function RequireRoles({ children, fallback, roles = [] }: RequireRolesProps) {
  if (roles.length === 0) {
    console.warn(
      'No required roles have been passed to the component. ' +
        'You should either define one or many role(s) or alternatively remove the component.',
    );
  }

  const userRoles = useUserStore((state) => state.userInfo?.user.roles ?? []);
  const requiredRoles = Array.isArray(roles) ? roles : [roles];
  const hasAccess = requiredRoles.every((requiredRole) => userRoles.includes(requiredRole));
  return <>{hasAccess ? children : fallback}</>;
}
