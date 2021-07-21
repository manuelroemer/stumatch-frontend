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
import { useForm } from 'react-hook-form';
import { HiHashtag } from 'react-icons/hi';
import { PostAdvertisement } from '../../api/advertisement';
import { getUser } from '../../api/users';
import FacultyDropdown from '../../components/FacultyDropdown';
import { useAdvertisementMutation } from '../../queries/advertisements';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import { usePostMutation } from '../../queries/posts';
import { useCurrentUser } from '../../stores/userStore';

export interface AdvertisementModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function AdvertisementModal({ isOpen, onClose }: AdvertisementModalProps): JSX.Element {
  const [validCategory, setValidCategory] = useState(true);
  const form = useForm<PostAdvertisement>();
  const mutation = useAdvertisementMutation();
  const { isLoading, data } = useGetAllFacultiesQuery();
  const userId = useCurrentUser().id;
  form.setValue('authorId', userId);
  const cDate = new Date();

  const onSubmit = form.handleSubmit(async (postAdvertisement) => {
    console.log(postAdvertisement);
    mutation.mutate(postAdvertisement);
  });

  return (
    <Modal isOpen={isOpen} size="6xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Create a new advertisement</ModalHeader>
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
            <Button onClick={onClose} colorScheme="blue" mr={3} type="submit" isLoading={mutation.isLoading}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

function removeTimeFromDate(dateString: string) {
  return new Date(new Date(dateString).toDateString());
}
