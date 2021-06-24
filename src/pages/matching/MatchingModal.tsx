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
  FormControl,
  FormLabel,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
} from '@chakra-ui/react';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import FacultyDropdown from './FacultyDropdown';

export interface MatchingModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function MatchingModal({ isOpen, onClose }: MatchingModalProps) {
  const { isLoading, data } = useGetAllFacultiesQuery();
  return (
    <>
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
                  <FormControl>
                    <FormLabel>Select the semesters you would like to meet</FormLabel>
                    <HStack>
                      <NumberInput min={1} variant="filled">
                        <NumberInputField placeholder="Min. Semester" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Spacer />
                      <NumberInput min={1} variant="filled">
                        <NumberInputField placeholder="Max.Semester" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </HStack>
                  </FormControl>
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
    </>
  );
}
