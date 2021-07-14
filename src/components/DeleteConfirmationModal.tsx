import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';

export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  header: string;
  confirmText: string;
  cancelText: string;
  onConfirm(): Promise<any>;
  onClose(): void;
}

export function DeleteConfirmationModal({
  isOpen,
  header,
  confirmText,
  cancelText,
  onConfirm,
  onClose,
}: DeleteConfirmationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cancelRef = useRef<any>();

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} closeOnOverlayClick={!isSubmitting}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>
          <AlertDialogBody>Are you sure? You can not undo this action afterwards.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} isDisabled={isSubmitting} onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              isLoading={isSubmitting}
              colorScheme="red"
              ml={3}
              onClick={async () => {
                try {
                  setIsSubmitting(true);
                  await onConfirm();
                } finally {
                  onClose();
                  setIsSubmitting(false);
                }
              }}>
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export type UseDeleteConfirmationModalProps = Omit<Omit<DeleteConfirmationModalProps, 'isOpen'>, 'onClose'>;

export function useDeleteConfirmationModal() {
  const [props, setProps] = useState<DeleteConfirmationModalProps | null>(null);
  const modal = props ? <DeleteConfirmationModal {...props} /> : null;
  const show = (modalProps: UseDeleteConfirmationModalProps) =>
    setProps({
      ...modalProps,
      isOpen: true,
      onClose: () => {
        setProps(null);
      },
    });

  return {
    modal,
    show,
  };
}
