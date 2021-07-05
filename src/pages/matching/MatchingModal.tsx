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
import { useForm } from 'react-hook-form';
import { MatchRequestPost } from '../../api/matching';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import { usePostMatchRequestMutation } from '../../queries/matchRequests';
import FacultyDropdown from '../../components/FacultyDropdown';
import SemesterSelection from './SemesterSelection';

export interface MatchingModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function MatchingModal({ isOpen, onClose }: MatchingModalProps) {
  const { isLoading, data } = useGetAllFacultiesQuery();
  const form = useForm<MatchRequestPost>();
  const mutation = usePostMatchRequestMutation();
  const onSubmit = form.handleSubmit(async (matchRequestPost) => {
    mutation.mutate(matchRequestPost);
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
                <FacultyDropdown
                  facultyData={data?.result ?? []}
                  facultyDescription="Select the faculty you would like to meet."
                  studyProgramDescription="Select the study program you would like to meet."
                  onFacultyChanged={(faculty) => form.setValue('facultyId', faculty?.id)}
                  onStudyProgramChanged={(studyProgram) => form.setValue('studyProgramId', studyProgram?.id)}
                />
                <SemesterSelection form={form} />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="primary" mr={3} type="submit" isLoading={mutation.isLoading}>
                Create
              </Button>
              <Button onClick={onClose} isLoading={mutation.isLoading}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
