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
  Textarea,
  Icon,
  WrapItem,
  Tooltip,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { HiHashtag } from 'react-icons/hi';
import { Advertisement, PostAdvertisement, PutAdvertisement } from '../../api/advertisement';
import { MatchRequestPut } from '../../api/matching';
import { getUser } from '../../api/users';
import FacultyDropdown from '../../components/FacultyDropdown';
import { usePostAdvertisementMutation, usePutAdvertisementMutation } from '../../queries/advertisements';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import { usePostMutation } from '../../queries/posts';
import { useCurrentUser } from '../../stores/userStore';

export interface AdvertisementModalProps {
  isOpen: boolean;
  onClose(): void;
  isUpdate: boolean;
  advertisement?: Advertisement;
}

function removeTimeFromDate(dateString: string) {
  return new Date(new Date(dateString).toDateString());
}

export default function AdvertisementModal({
  isOpen,
  onClose,
  isUpdate,
  advertisement,
}: AdvertisementModalProps): JSX.Element {
  const [validCategory, setValidCategory] = useState(true);
  const form = !isUpdate ? useForm<PostAdvertisement>() : useForm<PutAdvertisement>();
  const postMutation = usePostAdvertisementMutation();
  const putMutation = usePutAdvertisementMutation();
  const { isLoading, data } = useGetAllFacultiesQuery();
  const userId = useCurrentUser().id;
  if (!isUpdate) {
    form.setValue('authorId', userId);
  }
  const cDate = new Date();
  const onSubmit = form.handleSubmit(async (advertisementValue) => {
    if (!isUpdate) {
      const adValue = advertisementValue as PostAdvertisement;
      postMutation.mutate(adValue);
    } else {
      putMutation.mutate({ id: advertisement!.id, body: advertisementValue });
    }
  });

  return (
    <Modal isOpen={isOpen} size="6xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>{!isUpdate ? 'Create a new advertisement' : 'Edit advertisement'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="flex-start" spacing="10">
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Textarea
                  onChange={(e: any) => {
                    form.setValue('title', e.target.value);
                  }}
                  minH="unset"
                  overflow="hidden"
                  w="100%"
                  resize="none"
                  placeholder="Please enter the advertisements' title here"
                  defaultValue={advertisement?.title}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Short Description</FormLabel>
                <Textarea
                  onChange={(e: any) => {
                    form.setValue('shortDescription', e.target.value);
                  }}
                  minH="unset"
                  overflow="hidden"
                  w="100%"
                  resize="none"
                  placeholder="Enter a short description"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  placeholder="Enter the advertisements' content here"
                  onChange={(e: any) => {
                    form.setValue('content', e.target.value);
                  }}
                />
              </FormControl>
              <FacultyDropdown
                facultyData={data?.result ?? []}
                facultyDescription="Select your faculty."
                studyProgramDescription="Select your study program."
                onFacultyChanged={(faculty) => form.setValue('facultyId', faculty?.id)}
                onStudyProgramChanged={(studyProgram) => form.setValue('studyProgramId', studyProgram?.id)}
              />
              <FormControl isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  onChange={(e: any) => {
                    form.setValue('startDate', removeTimeFromDate(e.target.value));
                    console.log(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  onChange={(e: any) => {
                    form.setValue('endDate', removeTimeFromDate(e.target.value));
                  }}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={postMutation.isLoading || putMutation.isLoading}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
