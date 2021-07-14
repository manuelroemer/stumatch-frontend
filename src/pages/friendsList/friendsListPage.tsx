import { IconButton, Skeleton, SkeletonCircle, Spacer, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { me } from '../../api/conventions';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import UserAvatar from '../../components/UserAvatar';
import {
  useDeleteFriendsListEntryMutation,
  useGetAllUserFriendsListEntriesQuery,
} from '../../queries/friendsListEntries';
import { getFullName } from '../../utils/userUtils';
import { MdDeleteForever } from 'react-icons/md';
import range from 'lodash-es/range';
import { useDeleteConfirmationModal } from '../../components/DeleteConfirmationModal';

export default function friendsListPage() {
  const { isLoading, data } = useGetAllUserFriendsListEntriesQuery(me);
  const mutation = useDeleteFriendsListEntryMutation();
  const deleteModal = useDeleteConfirmationModal();

  return (
    <DefaultPageLayout header="Your Friends">
      <Table>
        <Tbody>
          {isLoading &&
            range(4).map((i) => (
              <Tr key={i}>
                <Td display="flex" alignItems="center" p="3">
                  <SkeletonCircle w="12" h="12" mr="6" ml="4" />
                  <Skeleton flex="auto" h="5" w="auto" mr="4" />
                </Td>
              </Tr>
            ))}
          {data?.result.map((friendsListEntry) => (
            <Tr key={friendsListEntry.id}>
              <Td display="flex" alignItems="center" p="3">
                <UserAvatar userId={friendsListEntry.friendId} size="md" mr="6" ml="4" />
                {getFullName(friendsListEntry.friend)}
                <Spacer />
                <IconButton
                  aria-label="Delete"
                  icon={<MdDeleteForever />}
                  mr="4"
                  fontSize="20"
                  onClick={() => {
                    deleteModal.show({
                      header: 'Unfriend ' + getFullName(friendsListEntry.friend),
                      cancelText: "No, don't",
                      confirmText: 'Yes, unfriend',
                      onConfirm: () => mutation.mutateAsync(friendsListEntry.id),
                    });
                  }}
                />
              </Td>
            </Tr>
          ))}
          {deleteModal.modal}
        </Tbody>
      </Table>
    </DefaultPageLayout>
  );
}
