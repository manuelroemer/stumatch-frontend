import {
  Badge,
  Center,
  HStack,
  IconButton,
  Link,
  Skeleton,
  SkeletonCircle,
  Spacer,
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import UserAvatar from '../../components/UserAvatar';
import { getFullName } from '../../utils/userUtils';
import range from 'lodash-es/range';
import { usePageQueryParameter, usePageSizeQueryParameter } from '../../utils/useQueryParameter';
import { useGetAllUsersQuery } from '../../queries/users';
import Pagination from '../../components/Pagination';
import { HiOutlineMail } from 'react-icons/hi';
import { NoJobSearchingUserEmptyState } from '../../components/EmptyStates';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import { User } from '../../api/users';
import { Faculty } from '../../api/faculty';
import NameMailComponent from '../../components/NameMailComponent';

export default function AdvertisementUserListPage() {
  const [page, setPage] = usePageQueryParameter();
  const [pageSize] = usePageSizeQueryParameter();

  const { isLoading, data } = useGetAllUsersQuery({
    page,
    pageSize,
    lookingForJob: true,
    sort: 'firstName:asc, lastName:asc',
  });

  return (
    <>
      <Table size="lg">
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
          {data?.result.map((user) => (
            <Tr key={user.id}>
              <Td display="flex" alignItems="center" p="3">
                <UserAvatar userId={user.id} size="md" mr="6" ml="4" />
                <VStack align="flex-start">
                  <HStack>
                    <NameMailComponent name={getFullName(user)} email={user.email} />
                  </HStack>
                  <UsersFilters user={user} />
                </VStack>

                <Spacer />
                <Link href={`mailto:${user.email}`}>
                  <Tooltip hasArrow label={'E-Mail'}>
                    <IconButton aria-label="EMail" icon={<HiOutlineMail />} mr="4" fontSize="20" />
                  </Tooltip>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {data && data.result.length > 0 && (
        <Center mt="10">
          <Pagination currentPage={data.page} pages={data.pages} onPageChanged={setPage} />
        </Center>
      )}
      {data && data.result.length === 0 && <NoJobSearchingUserEmptyState />}
    </>
  );
}

function UsersFilters({ user }: { user: User }) {
  const { data } = useGetAllFacultiesQuery();
  const userFaculty = data?.result.find((faculty) => faculty.id === user.facultyId);
  const studyPrograms = data?.result
    .filter((faculty: Faculty) => userFaculty === undefined || faculty.id === userFaculty.id)
    .flatMap((faculty: Faculty) => faculty.studyPrograms);
  const userStudyProgram = studyPrograms?.find((studyProgram) => studyProgram.id === user.studyProgramId);

  return (
    <HStack>
      {user.facultyId && (
        <Badge variant="subtle" colorScheme="blue">
          Faculty: {userFaculty?.name}
        </Badge>
      )}
      {user.studyProgramId && (
        <Badge ml="2" variant="subtle" colorScheme="blue">
          Study program: {userStudyProgram?.name}
        </Badge>
      )}
      {user.startingSemester && user.startingYear && (
        <Badge ml="2" variant="subtle" colorScheme="cyan">
          Studienstart: {user.startingSemester} {user.startingYear}
        </Badge>
      )}
    </HStack>
  );
}
