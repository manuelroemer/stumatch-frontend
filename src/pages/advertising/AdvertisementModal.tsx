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
  IconButton,
  Image,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { FcCancel } from 'react-icons/fc';
import { HiHashtag } from 'react-icons/hi';
import { RiImageAddLine } from 'react-icons/ri';
import { Advertisement, PostAdvertisement, PutAdvertisement } from '../../api/advertisement';
import { MatchRequestPut } from '../../api/matching';
import { getUser } from '../../api/users';
import FacultyDropdown from '../../components/FacultyDropdown';
import { usePostAdvertisementMutation, usePutAdvertisementMutation } from '../../queries/advertisements';
import { useGetAllFacultiesQuery } from '../../queries/faculties';
import { usePostMutation } from '../../queries/posts';
import { useCurrentUser } from '../../stores/userStore';
import { useImagePicker } from '../../utils/useImagePicker';

export interface AdvertisementModalProps {
  isOpen: boolean;
  onClose(): void;
  isUpdate: boolean;
  advertisement?: Advertisement;
}

/* function removeTimeFromDate(dateString: string) {
  return new Date(new Date(dateString).toDateString());
} */

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
  // const form = !isUpdate ? useForm<PostAdvertisement>() : useForm<PutAdvertisement>();
  const form = useForm<PostAdvertisement>();
  const postMutation = usePostAdvertisementMutation();
  const putMutation = usePutAdvertisementMutation();
  const { isLoading, data } = useGetAllFacultiesQuery();
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
                  defaultValue={advertisement?.shortDescription}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  placeholder="Enter the advertisements' content here"
                  onChange={(e: any) => {
                    form.setValue('content', e.target.value);
                  }}
                  defaultValue={advertisement?.content}
                />
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
              <FormControl isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  onChange={(e: any) => {
                    form.setValue('startDate', e.target.value);
                    console.log(e.target.value);
                  }}
                  defaultValue={getDefaultDateValue(advertisement?.startDate)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  onChange={(e: any) => {
                    form.setValue('endDate', e.target.value);
                  }}
                  defaultValue={getDefaultDateValue(advertisement?.endDate)}
                />
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
                      <FormLabel>Post Picture</FormLabel>
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
            <Button
              onClick={onClose}
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={postMutation.isLoading || putMutation.isLoading}>
              {!isUpdate ? 'Create' : 'Save'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
