import {
  VStack,
  Center,
  Text,
  Heading,
  Select,
  Flex,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  chakra,
  Badge,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { range } from 'lodash-es';
import FloatingCard from '../../components/FloatingCard';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import Pagination from '../../components/Pagination';
import { useGetAllContactRequestsQuery, usePutContactRequestMutation } from '../../queries/contactRequest';
import {
  usePageQueryParameter,
  usePageSizeQueryParameter,
  useStringQueryParameter,
} from '../../utils/useQueryParameter';
import { ContactRequest } from '../../api/contactRequest';
import { NoContactRequestsEmptyState } from '../../components/EmptyStates';
import NameMailComponent from '../../components/NameMailComponent';

export function ViewContactRequestsPage() {
  const [page, setPage] = usePageQueryParameter('contactPage');
  const [pageSize] = usePageSizeQueryParameter('contactPageSize');
  const [pageSort, setPageSort] = useStringQueryParameter('sort', 'desc');
  const [pageFilter, setPageFilter] = useStringQueryParameter('status', '');
  const { isLoading, data } = useGetAllContactRequestsQuery({
    page,
    pageSize,
    filter: pageFilter,
    sort: `createdOn:${pageSort}`,
  });
  const mutation = usePutContactRequestMutation();
  return (
    <>
      <VStack spacing="5">
        <HStack w="100%" justify="flex-start" spacing="3">
          <Text>Status: </Text>
          <Select
            onChange={(e) => setPageFilter(e.target.value === 'all' ? '' : e.target.value)}
            value={pageFilter}
            maxW="52">
            <option value="all"> All </option>
            <option value="open"> Open </option>
            <option value="inProgress"> In Progress </option>
            <option value="closed"> Closed </option>
          </Select>
          <Text minWidth="max-content">Sort by: </Text>
          <Select onChange={(e) => setPageSort(e.target.value)} value={pageSort} maxW="48">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </Select>
        </HStack>
        <Spacer />

        {isLoading ? (
          range(3).map((i) => (
            <FloatingCard key={i} p="4">
              <ImageTitleDescriptionSkeleton />
            </FloatingCard>
          ))
        ) : (
          <>
            {data?.result.map((contactRequest) => (
              <FloatingCard key={contactRequest.id} p="4">
                <Flex>
                  <Accordion allowToggle w="100%" mr="4">
                    <AccordionItem border="0">
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <Heading as="h3" lineHeight="1.4" fontSize="md" fontWeight="medium" isTruncated>
                            <chakra.span fontWeight="bold">
                              {getDisplayDataForType(contactRequest.type).emoji} [
                              {getDisplayDataForType(contactRequest.type).displayType}]{' '}
                            </chakra.span>
                            by <NameMailComponent name={contactRequest.name} email={contactRequest.email} />
                            <Badge
                              ml="2"
                              variant="solid"
                              colorScheme={getStatusForDisplay(contactRequest.status).color}>
                              {getStatusForDisplay(contactRequest.status).text}
                            </Badge>
                          </Heading>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel pb={4}>
                        <Text wordBreak="break-all" whiteSpace="pre-line">
                          {contactRequest.message}
                        </Text>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>

                  <Select
                    variant="filled"
                    w="40"
                    mr="2"
                    value={contactRequest.status}
                    onChange={async (e) => {
                      mutation.mutate({ id: contactRequest.id, body: { status: e.target.value as any } });
                    }}>
                    <option value="open">Open</option>
                    <option value="inProgress">In Progress</option>
                    <option value="closed">Closed</option>
                  </Select>
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
      {data && data.result.length === 0 && <NoContactRequestsEmptyState />}
    </>
  );
}

function getDisplayDataForType(type: ContactRequest['type']) {
  return {
    role: {
      emoji: '👥',
      displayType: 'Role',
    },
    featureBug: {
      emoji: '🐞',
      displayType: 'Feature/Bug',
    },
    other: {
      emoji: '❓',
      displayType: 'Other',
    },
  }[type];
}

function getStatusForDisplay(status: ContactRequest['status']) {
  return {
    open: {
      text: 'Open',
      color: 'green',
    },
    inProgress: {
      text: 'In Progress',
      color: 'orange',
    },
    closed: {
      text: 'Closed',
      color: 'gray',
    },
  }[status];
}
