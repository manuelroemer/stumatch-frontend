import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Checkbox,
  HStack,
  VStack,
  Skeleton,
  SkeletonCircle,
  Flex,
} from '@chakra-ui/react';
import range from 'lodash-es/range';
import { useEffect, useState } from 'react';
import { User } from '../api/users';
import { useGetAllUserFriendsListEntriesQuery } from '../queries/friendsListEntries';
import { useCurrentUser } from '../stores/userStore';
import { getFullName } from '../utils/userUtils';
import UserAvatar from './UserAvatar';

export interface FriendsListPickerModalProps {
  title: string;
  acceptText: string;
  cancelText: string;
  isOpen: boolean;
  onClose(): void;
  onSubmit(selectedUsers: Array<User>): Promise<void>;
}

export default function FriendsListPickerModal({
  title,
  acceptText,
  cancelText,
  isOpen,
  onClose,
  onSubmit,
}: FriendsListPickerModalProps) {
  const userId = useCurrentUser().id;
  const { isLoading, data } = useGetAllUserFriendsListEntriesQuery(userId);
  const [selectedUsers, setSelectedUsers] = useState<Array<User>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUserChecked = (user: User, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.id !== user.id));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await onSubmit(selectedUsers);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  useEffect(() => setSelectedUsers([]), [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton disabled={isSubmitting} />
        <ModalBody>
          <VStack align="flex-start" maxH="60vh" overflowY="auto">
            {isLoading && <FriendsListPickerModalSkeleton />}
            {data &&
              data.result.length > 0 &&
              data.result.map((friendsListEntry) => (
                <Checkbox
                  key={friendsListEntry.id}
                  isDisabled={isSubmitting}
                  onChange={(e) => handleUserChecked(friendsListEntry.friend, e.target.checked)}>
                  <HStack ml="2" my="1">
                    <UserAvatar userId={friendsListEntry.friendId} size="sm" />
                    <Text>{getFullName(friendsListEntry.friend)}</Text>
                  </HStack>
                </Checkbox>
              ))}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            isLoading={isSubmitting}
            isDisabled={selectedUsers.length === 0}
            onClick={() => handleSubmit()}>
            {acceptText}
          </Button>
          <Button variant="ghost" disabled={isSubmitting} onClick={onClose}>
            {cancelText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function FriendsListPickerModalSkeleton() {
  return (
    <>
      {range(4).map((i) => (
        <Flex key={i} w="100%" align="center">
          <Skeleton w="4" h="4" mr="3" />
          <SkeletonCircle w="9" h="9" mr="2" />
          <Skeleton flex="auto" h="4" w="auto" />
        </Flex>
      ))}
    </>
  );
}
