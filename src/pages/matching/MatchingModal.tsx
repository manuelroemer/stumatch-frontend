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
import { MatchRequest, MatchRequestPost, MatchRequestPut } from '../../api/matching';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import { usePostMatchRequestMutation, usePutMatchRequestMutation } from '../../queries/matchRequests';
import FacultyDropdown from '../../components/FacultyDropdown';
import SemesterSelection from './SemesterSelection';

export interface MatchingModalProps {
  isOpen: boolean;
  onClose(): void;
  isUpdate: boolean;
  matchRequest?: MatchRequest;
}

export default function MatchingModal({ isOpen, onClose, isUpdate, matchRequest }: MatchingModalProps) {
  const { isLoading, data } = useGetAllFacultiesQuery();
  const form = !isUpdate ? useForm<MatchRequestPost>() : useForm<MatchRequestPut>();
  const putMutation = usePutMatchRequestMutation();
  const postMutation = usePostMatchRequestMutation();
  const onSubmit = form.handleSubmit(async (matchRequestValue) => {
    if (!isUpdate) {
      postMutation.mutate(matchRequestValue);
    } else {
      putMutation.mutate({ id: matchRequest!.id, body: matchRequestValue });
    }
  });

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {!isLoading && (
          <form onSubmit={onSubmit}>
            <ModalHeader>{!isUpdate ? 'Create New Match Request' : 'Edit Match Request'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="flex-start" spacing="10">
                <FacultyDropdown
                  facultyData={data?.result ?? []}
                  initialFacultyId={matchRequest?.faculty?.id}
                  initialStudyProgramId={matchRequest?.studyProgram?._id}
                  facultyDescription="Select the faculty you would like to meet."
                  studyProgramDescription="Select the study program you would like to meet."
                  onFacultyChanged={(faculty) => form.setValue('facultyId', faculty?.id)}
                  onStudyProgramChanged={(studyProgram) => form.setValue('studyProgramId', studyProgram?.id)}
                />
                <SemesterSelection
                  form={form}
                  initialMinSemester={matchRequest?.minSemester}
                  initialMaxSemester={matchRequest?.maxSemester}
                />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="primary"
                mr={3}
                type="submit"
                isLoading={postMutation.isLoading || putMutation.isLoading}
                onClick={onClose}>
                {!isUpdate ? 'Create' : 'Save'}
              </Button>
              <Button onClick={onClose} isLoading={postMutation.isLoading || putMutation.isLoading}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
