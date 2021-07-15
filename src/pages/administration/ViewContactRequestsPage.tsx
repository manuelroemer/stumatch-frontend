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
  Link,
} from '@chakra-ui/react';
import { range } from 'lodash-es';
import FloatingCard from '../../components/FloatingCard';
import ImageTitleDescriptionSkeleton from '../../components/ImageTitleDescriptionSkeleton';
import Pagination from '../../components/Pagination';
import { useGetAllContactRequestsQuery, usePutContactRequestMutation } from '../../queries/contactRequest';
import { usePageQueryParameter, usePageSizeQueryParameter } from '../../utils/useQueryParameter';
import { ContactRequest } from '../../api/contactRequest';
import { NoContactRequestsEmptyState } from '../../components/EmptyStates';

export function ViewContactRequestsPage() {
  const [page, setPage] = usePageQueryParameter();
  const [pageSize] = usePageSizeQueryParameter();
  const { isLoading, data } = useGetAllContactRequestsQuery({ page, pageSize, sort: 'createdOn:desc' });
  const mutation = usePutContactRequestMutation();
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
                            by {contactRequest.name}{' '}
                            <Link href={`mailto:${contactRequest.email}`}>({contactRequest.email})</Link>
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
