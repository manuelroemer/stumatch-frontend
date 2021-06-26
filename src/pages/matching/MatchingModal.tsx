import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import FacultyDropdown from './FacultyDropdown';
import SemesterSelection from './SemesterSelection';

export interface MatchingModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function MatchingModal({ isOpen, onClose }: MatchingModalProps) {
  const { isLoading, data } = useGetAllFacultiesQuery();

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {!isLoading && (
          <>
            <ModalHeader>Create New Match Request</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="flex-start" spacing="10">
                <FacultyDropdown facultyData={data?.result ?? []} />
                <SemesterSelection />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
