import flatten from 'lodash-es/flatten';
import { useQueries, useQuery } from 'react-query';
import { getAllUserChatGroups } from '../api/chatGroups';
import { me, PaginationQueryOptions } from '../api/conventions';
import { getUser } from '../api/users';
import { usersQueryKey } from './users';

export const chatGroupsQueryKey = 'chatGroups';

export function useGetAllUserChatGroupsQuery(userId: string, options?: PaginationQueryOptions) {
  return useQuery([chatGroupsQueryKey, userId, options], () =>
    getAllUserChatGroups(userId, options).then((res) => res.data),
  );
}
