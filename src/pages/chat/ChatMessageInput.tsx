import { HStack, IconButton, Input, Tooltip } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { BiSend } from 'react-icons/bi';
import isEmpty from 'lodash-es/isEmpty';
import trim from 'lodash-es/trim';
import { useEffect } from 'react';

export interface ChatMessageInputProps {
  onMessageSent(message: string): void;
}

interface FormValues {
  typedMessage: string;
}

export default function ChatMessageInput({ onMessageSent }: ChatMessageInputProps) {
  const { register, handleSubmit, formState, setValue, trigger, watch } = useForm<FormValues>();
  const typedMessage = watch('typedMessage');
  const handleSendSubmit = handleSubmit(({ typedMessage }) => {
    onMessageSent(typedMessage);
    setValue('typedMessage', '');
  });

  useEffect(() => {
    trigger();
  }, [typedMessage]);

  return (
    <form onSubmit={handleSendSubmit}>
      <HStack
        spacing="4"
        py="4"
        px="8"
        bg="white"
        overflowY="scroll"
        // Dirty hack: To get the correct padding as the chat messages above we need the system's
        // scrollbar width. Simply achieve that by adding a transparent scrollbar.
        sx={{ 'scrollbar-color': 'transparent transparent', 'scrollbar-width': 'thin' }}>
        <Input
          rounded="full"
          autoFocus
          {...register('typedMessage', {
            validate: (value) => !isEmpty(value),
            setValueAs: trim,
          })}
        />
        <Tooltip type="submit" label="Send" hasArrow>
          <IconButton
            aria-label="Send"
            icon={<BiSend />}
            colorScheme="primary"
            rounded="full"
            type="submit"
            isDisabled={!formState.isValid}
          />
        </Tooltip>
      </HStack>
    </form>
  );
}
