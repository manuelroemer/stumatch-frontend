import { VStack, Center, HStack, Flex, Link, Spacer, Checkbox, CheckboxGroup, IconButton } from '@chakra-ui/react';
import { range } from 'lodash-es';
import { NoUserEmptyState } from '../../components/EmptyStates';
import FloatingCard from '../../components/FloatingCard';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import Pagination from '../../components/Pagination';
import UserAvatar from '../../components/UserAvatar';
import { useGetAllUsersQuery, usePutUserMutation } from '../../queries/users';
import { usePageQueryParameter, usePageSizeQueryParameter } from '../../utils/useQueryParameter';
import { getFullName } from '../../utils/userUtils';
import { FiSave } from 'react-icons/fi';

export function RoleManagementPage() {
  const [page, setPage] = usePageQueryParameter();
  const [pageSize] = usePageSizeQueryParameter();
  const { isLoading, data } = useGetAllUsersQuery({ page, pageSize, sort: 'firstName:asc' });
  const mutation = usePutUserMutation();

  return (
    <>
      <VStack spacing="5">
        {isLoading ? (
          range(3).map((i) => (
            <FloatingCard key={i} p="4">
              <ImageTitleDescriptionSkeleton />
            </FloatingCard>
          ))
        ) : (
          <>
            {data?.result.map((user) => (
              <FloatingCard key={user.id} p="4">
                <Flex align="center">
                  <UserAvatar userId={user.id} mr="4" />
                  {getFullName(user)}
                  <Link href={`mailto:${user.email}`} ml="2">
                    ({user.email})
                  </Link>
                  <Spacer />
                  <CheckboxGroup colorScheme="primary" value={user.roles}>
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
                      <IconButton
                        disabled
                        aria-label="save"
                        icon={<FiSave />}
                        type="submit"
                        onSubmit={async (value) => {
                          mutation.mutate({ id: user.id, body: { roles: value as any } });
                        }}
                      />
                    </HStack>
                  </CheckboxGroup>
                </Flex>
              </FloatingCard>
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
