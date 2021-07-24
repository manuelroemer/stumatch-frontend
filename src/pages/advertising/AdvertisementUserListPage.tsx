import {
  Badge,
  Center,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Skeleton,
  SkeletonCircle,
  Spacer,
  Table,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import UserAvatar from '../../components/UserAvatar';
import { getFullName } from '../../utils/userUtils';
import range from 'lodash-es/range';
import {
  usePageQueryParameter,
  usePageSizeQueryParameter,
  useStringQueryParameter,
} from '../../utils/useQueryParameter';
import { useGetAllUsersQuery } from '../../queries/users';
import Pagination from '../../components/Pagination';
import { BsSearch } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { NoJobSearchingUserEmptyState } from '../../components/EmptyStates';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import { User } from '../../api/users';
import { Faculty } from '../../api/faculty';

export default function AdvertisementUserListPage() {
  const [page, setPage] = usePageQueryParameter();
  const [pageSize] = usePageSizeQueryParameter();
  const [pageFilter, setPageFilter] = useStringQueryParameter('filter', '');
  const { isLoading, data } = useGetAllUsersQuery({
    page,
    pageSize,
    filter: pageFilter,
    lookingForJob: true,
    sort: 'firstName:asc, lastName:asc',
  });

  return (
    <DefaultPageLayout header="Job Candidates" subHeader="Students who are currently looking for a job.">
      <HStack w="100%">
        <InputGroup>
          <InputRightElement pointerEvents="none">{<Icon as={BsSearch} />} </InputRightElement>
          <Input type="text" placeholder="Search User..." onChange={(e) => setPageFilter(e.target.value)} />
        </InputGroup>
      </HStack>
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
          {data?.result.map((user) => (
            <Tr key={user.id}>
              <Td display="flex" alignItems="center" p="3">
                <UserAvatar userId={user.id} size="md" mr="6" ml="4" />
                {getFullName(user)}{' '}
                <Link href={`mailto:${user.email}`} ml="2">
                  (<Icon as={HiOutlineMail} /> {user.email})
                </Link>
                <Spacer />
                <Link href={`mailto:${user.email}`}>
                  <IconButton aria-label="EMail" icon={<HiOutlineMail />} mr="4" fontSize="20" />
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
    </DefaultPageLayout>
  );
}

// function UsersFilters({ user }: { user: User }) {
//   const { data } = useGetAllFacultiesQuery();
//   const userFaculty = data?.result.find((faculty) => faculty.id === user.facultyId);
//   const studyPrograms = data?.result
//     .filter((faculty: Faculty) => userFaculty === undefined || faculty.id === userFaculty.id)
//     .flatMap((faculty: Faculty) => faculty.studyPrograms);
//   const userStudyProgram = studyPrograms?.find((studyProgram) => studyProgram.id === user.studyProgramId);
//   return (
//     <HStack>
//       <Badge variant="solid" colorScheme="blue">
//         {userFaculty?.name}
//       </Badge>

//       <Badge ml="2" variant="solid" colorScheme="blue">
//         {userStudyProgram?.name}
//       </Badge>
//     </HStack>
//   );
// }
