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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MatchRequestPost } from '../../api/matching';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import { usePostMatchRequestMutation } from '../../queries/matchRequests';
import FacultyDropdown from './FacultyDropdown';
import SemesterSelection from './SemesterSelection';

export interface MatchingModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function MatchingModal({ isOpen, onClose }: MatchingModalProps) {
  const { isLoading, data } = useGetAllFacultiesQuery();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<MatchRequestPost>();
  const mutation = usePostMatchRequestMutation();
  const onSubmit = form.handleSubmit(async (matchRequestPost) => {
    setIsSubmitting(true);
    try {
      await mutation.mutateAsync(matchRequestPost);
      onClose();
    } catch (e) {
      //todo
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {!isLoading && (
          <form onSubmit={onSubmit}>
            <ModalHeader>Create New Match Request</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="flex-start" spacing="10">
                <FacultyDropdown facultyData={data?.result ?? []} form={form} />
                <SemesterSelection form={form} />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="primary" mr={3} type="submit" isLoading={isSubmitting}>
                Create
              </Button>
              <Button onClick={onClose} isLoading={isSubmitting}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
