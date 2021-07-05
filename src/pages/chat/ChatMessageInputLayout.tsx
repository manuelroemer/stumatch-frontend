import { KeyboardEvent, useRef } from 'react';
import { HStack, IconButton, Textarea, Tooltip } from '@chakra-ui/react';
import { IEmojiData } from 'emoji-picker-react';
import { BiSend } from 'react-icons/bi';
import isEmpty from 'lodash-es/isEmpty';
import trim from 'lodash-es/trim';
import countBy from 'lodash-es/countBy';
import EmojiPickerButton from './EmojiPickerPopover';
import { useEffect } from 'react';

export interface ChatMessageInputLayoutProps {
  message: string;
  isSending: boolean;
  isEditing: boolean;
  onMessageChanged(message: string): void;
  onSendClicked(): void;
}

export default function ChatMessageInputLayout({
  message,
  isSending,
  isEditing,
  onMessageChanged,
  onSendClicked,
}: ChatMessageInputLayoutProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const sanitizedMessage = trim(message);
  const canSubmit = !isEmpty(sanitizedMessage) && !isSending;
  const typedLines = countBy(message)['\n'] + 1 || 1;

  const focusInput = () => setTimeout(() => inputRef.current!.focus(), 0); // https://stackoverflow.com/a/1096938

  const handleEmojiSelected = (emoji: IEmojiData) => {
    onMessageChanged(message + emoji.emoji);
    inputRef.current!.focus();
  };

  const handleTextAreaKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const send = () => {
    // Should be checked as the handler can be invoked with the Enter key despite the button being disabled.
    if (!canSubmit) {
      return;
    }

    onSendClicked();
    focusInput();
  };

  useEffect(() => {
    if (isEditing) {
      focusInput();
    }
  }, [isEditing]);

  return (
    <HStack
      spacing="4"
      py="4"
      px="8"
      bg="white"
      overflowY="scroll"
      // Hack: To get the correct padding as the chat messages above we need the system's
      // scrollbar width. Simply achieve that by adding a transparent scrollbar.
      sx={{ scrollbarColor: 'transparent transparent' }}
      css={{
        '::-webkit-scrollbar': {
          backgroundColor: 'transparent',
        },
      }}>
      <EmojiPickerButton onEmojiSelected={handleEmojiSelected} />
      <Textarea
        ref={inputRef}
        rounded="3xl"
        autoFocus
        variant="filled"
        resize="none"
        placeholder="Type here to send a message..."
        rows={Math.min(5, typedLines)}
        value={message}
        onKeyPress={handleTextAreaKeyPress}
        onChange={(e) => onMessageChanged(e.target.value)}
      />
      <Tooltip type="submit" label="Send" hasArrow>
        <IconButton
          aria-label="Send"
          icon={<BiSend />}
          colorScheme="primary"
          rounded="full"
          isDisabled={!canSubmit}
          isLoading={isSending}
          onClick={send}
        />
      </Tooltip>
    </HStack>
  );
}
