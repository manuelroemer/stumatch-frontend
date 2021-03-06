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
  Textarea,
  Input,
  IconButton,
  Image,
  FormErrorMessage,
  HStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FcCancel } from 'react-icons/fc';
import { RiImageAddLine } from 'react-icons/ri';
import { Advertisement, PostAdvertisement, PutAdvertisement } from '../../api/advertisement';
import FacultyDropdown from '../../components/FacultyDropdown';
import { usePostAdvertisementMutation, usePutAdvertisementMutation } from '../../queries/advertisements';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import { useCurrentUser } from '../../stores/userStore';
import { useImagePicker } from '../../utils/useImagePicker';

export interface AdvertisementModalProps {
  isOpen: boolean;
  onClose(): void;
  isUpdate: boolean;
  advertisement?: Advertisement;
}

function getDefaultDateValue(dateString?: string) {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString as string);
  const ret = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  return ret;
}

export default function AdvertisementModal({
  isOpen,
  onClose,
  isUpdate,
  advertisement,
}: AdvertisementModalProps): JSX.Element {
  const form = useForm<PostAdvertisement | PutAdvertisement>();
  const postMutation = usePostAdvertisementMutation();
  const putMutation = usePutAdvertisementMutation();
  const { data } = useGetAllFacultiesQuery();
  const userId = useCurrentUser().id;
  const advertisementImagePicker = useImagePicker();

  useEffect(() => {
    return form.setValue(
      'advertisementImageBlob',
      advertisementImagePicker.base64Data ? advertisementImagePicker.base64Data : '',
    );
  }, [advertisementImagePicker.base64Data]);

  if (!isUpdate) {
    form.setValue('authorId', userId);
  }
  const onSubmit = form.handleSubmit(async (advertisementValue) => {
    if (!isUpdate) {
      const adValue = advertisementValue as PostAdvertisement;
      postMutation.mutate(adValue);
    } else {
      putMutation.mutate({ id: advertisement!.id, body: advertisementValue });
    }
    advertisementImagePicker.clear();
    form.reset();
    onClose();
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
              <FormControl isRequired isInvalid={!!form.formState.errors.title}>
                <FormLabel>Title</FormLabel>
                <Textarea
                  {...form.register('title', { required: true, minLength: 1, maxLength: 100 })}
                  minH="unset"
                  overflow="hidden"
                  w="100%"
                  resize="none"
                  placeholder="Please enter the advertisements' title here"
                  defaultValue={advertisement?.title}
                />
                <FormErrorMessage>The Title must be between 1-100 characters. Please try again.</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!form.formState.errors.shortDescription}>
                <FormLabel>Short Description</FormLabel>
                <Textarea
                  {...form.register('shortDescription', { required: true, minLength: 1, maxLength: 100 })}
                  minH="unset"
                  overflow="hidden"
                  w="100%"
                  resize="none"
                  placeholder="Enter a short description"
                  defaultValue={advertisement?.shortDescription}
                />
                <FormErrorMessage>
                  The short description must be between 1-100 characters. Please try again.
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!form.formState.errors.content}>
                <FormLabel>Content</FormLabel>
                <Textarea
                  placeholder="Enter the advertisements' content here"
                  {...form.register('content', { required: true, minLength: 10 })}
                  defaultValue={advertisement?.content}
                />
                <FormErrorMessage>The content must contain at least 10 characters. Please try again.</FormErrorMessage>
              </FormControl>
              <FacultyDropdown
                facultyData={data?.result ?? []}
                facultyDescription="Select your faculty."
                studyProgramDescription="Select your study program."
                onFacultyChanged={(faculty) => form.setValue('facultyId', faculty?.id)}
                onStudyProgramChanged={(studyProgram) => form.setValue('studyProgramId', studyProgram?.id)}
                initialFacultyId={advertisement?.facultyId}
                initialStudyProgramId={advertisement?.studyProgramId}
              />
              <FormControl isRequired isInvalid={!!form.formState.errors.startDate}>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  defaultValue={getDefaultDateValue(advertisement?.startDate)}
                  {...form.register('startDate', {
                    required: true,
                  })}
                />
              </FormControl>
              <FormControl isRequired isInvalid={!!form.formState.errors.endDate}>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  {...form.register('endDate', {
                    required: true,
                    validate: (value) => value! >= form.getValues('startDate')!,
                  })}
                  defaultValue={getDefaultDateValue(advertisement?.endDate)}
                />
                <FormErrorMessage>The end date must be greater than the start date.</FormErrorMessage>
              </FormControl>
              <FormControl>
                {!advertisementImagePicker.src ? (
                  <>
                    <HStack justifyContent="space-between">
                      <FormLabel>Post Picture</FormLabel>
                    </HStack>
                    <IconButton
                      onClick={advertisementImagePicker.pickImage}
                      size="lg"
                      aria-label="AddPicture"
                      icon={<RiImageAddLine />}
                    />
                  </>
                ) : (
                  <>
                    <HStack marginBottom="5" justifyContent="space-between">
                      <FormLabel>Advertisement Picture</FormLabel>
                      <IconButton
                        onClick={advertisementImagePicker.clear}
                        size="xs"
                        aria-label="DeletePicture"
                        icon={<FcCancel />}
                      />
                    </HStack>
                    <Image src={advertisementImagePicker.src ? advertisementImagePicker.src : ''} />
                  </>
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" isLoading={postMutation.isLoading || putMutation.isLoading}>
              {!isUpdate ? 'Create' : 'Save'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
