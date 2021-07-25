import {
  VStack,
  Center,
  HStack,
  Flex,
  Link,
  Spacer,
  Checkbox,
  CheckboxGroup,
  IconButton,
  useToast,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react';
import { range } from 'lodash-es';
import { NoUserEmptyState } from '../../components/EmptyStates';
import FloatingCard from '../../components/FloatingCard';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import Pagination from '../../components/Pagination';
import UserAvatar from '../../components/UserAvatar';
import { useGetAllUsersQuery, usePutUserRolesMutation } from '../../queries/users';
import {
  usePageQueryParameter,
  usePageSizeQueryParameter,
  useStringQueryParameter,
} from '../../utils/useQueryParameter';
import { getFullName } from '../../utils/userUtils';
import { FiSave } from 'react-icons/fi';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { User } from '../../api/users';
import NameMailComponent from '../../components/NameMailComponent';

export function RoleManagementPage() {
  const [page, setPage] = usePageQueryParameter();
  const [pageSize] = usePageSizeQueryParameter();
  const [pageFilter, setPageFilter] = useStringQueryParameter('filter', '');
  const { isLoading, data } = useGetAllUsersQuery({
    page,
    pageSize,
    filter: pageFilter,
    sort: 'firstName:asc, lastName:asc',
  });

  return (
    <>
      <VStack spacing="5">
        <HStack w="100%">
          <InputGroup>
            <InputRightElement pointerEvents="none">{<Icon as={BsSearch} />} </InputRightElement>
            <Input type="text" placeholder="Search User..." onChange={(e) => setPageFilter(e.target.value)} />
          </InputGroup>
        </HStack>
        {isLoading ? (
          range(3).map((i) => (
            <FloatingCard key={i} p="4">
              <ImageTitleDescriptionSkeleton />
            </FloatingCard>
          ))
        ) : (
          <>
            {data?.result.map((user) => (
              <RoleUserCard user={user} key={user.id} />
            ))}
          </>
        )}
      </VStack>
      {data && data.result.length > 0 && (
        <Center mt="10">
          <Pagination currentPage={data.page} pages={data.pages} onPageChanged={setPage} />
        </Center>
      )}
      {data && data.result.length === 0 && <NoUserEmptyState />}
    </>
  );
}

interface RoleUserCardProps {
  user: User;
}

function RoleUserCard({ user }: RoleUserCardProps) {
  const mutation = usePutUserRolesMutation();
  const [selectedRoles, setSelectedRoles] = useState(user.roles);
  const toast = useToast();

  return (
    <FloatingCard p="4">
      <Flex align="center">
        <UserAvatar userId={user.id} mr="4" />
        <NameMailComponent name={getFullName(user)} email={user.email} />
        <Spacer />
        <CheckboxGroup colorScheme="primary" value={selectedRoles} onChange={(value) => setSelectedRoles(value as any)}>
          <HStack>
            <Checkbox value="student" mr="2">
              Student
            </Checkbox>
            <Checkbox value="advertiser" mr="2">
              Advertiser
            </Checkbox>
            <Checkbox value="globalContentManager" mr="2">
              GlobalContentManager
            </Checkbox>
            <Checkbox value="admin" mr="4">
              Admin
            </Checkbox>
            <Tooltip hasArrow label={'Save'}>
              <IconButton
                isDisabled={selectedRoles.length === 0}
                aria-label="save"
                icon={<FiSave />}
                type="submit"
                onClick={() => {
                  mutation.mutate({ id: user.id, body: { roles: selectedRoles } });
                  toast({
                    title: 'Roles successfully changed.',
                    description: "We've saved the new roles.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  });
                }}
              />
            </Tooltip>
          </HStack>
        </CheckboxGroup>
      </Flex>
    </FloatingCard>
  );
}
