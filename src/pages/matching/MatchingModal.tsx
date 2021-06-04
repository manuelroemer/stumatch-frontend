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
  Select,
  FormControl,
  FormLabel,
  FormHelperText,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
} from '@chakra-ui/react';

export interface MatchingModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function MatchingModal({ isOpen, onClose }: MatchingModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Match Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="flex-start" spacing="10">
              <FormControl>
                <FormLabel>Faculty</FormLabel>
                <Select variant="filled" placeholder="Any Faculty">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <FormHelperText>We will never share your email.</FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Study Program</FormLabel>
                <Select variant="filled" placeholder="Any Study Program">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <FormHelperText>We will never share your email.</FormHelperText>
              </FormControl>
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
                <FormHelperText>We will never share your email.</FormHelperText>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
