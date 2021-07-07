import { KeyboardEvent, useRef } from 'react';
import { HStack, IconButton, Textarea, Tooltip } from '@chakra-ui/react';
import { IEmojiData } from 'emoji-picker-react';
import { BiSend } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import isEmpty from 'lodash-es/isEmpty';
import trim from 'lodash-es/trim';
import countBy from 'lodash-es/countBy';
import EmojiPickerButton from './EmojiPickerPopover';
import { useEffect } from 'react';
import { useState } from 'react';

export interface ChatMessageInputLayoutProps {
  initialMessage: string;
  isSending: boolean;
  isEditing: boolean;
  onSendClicked(message: string): void;
  onCancelEditClicked(): void;
}

export default function ChatMessageInputLayout({
  initialMessage,
  isSending,
  isEditing,
  onSendClicked,
  onCancelEditClicked,
}: ChatMessageInputLayoutProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const sanitizedMessage = trim(message);
  const canSubmit = !isEmpty(sanitizedMessage) && !isSending;
  const typedLines = countBy(message)['\n'] + 1 || 1;

  useEffect(() => {
    setMessage(initialMessage);
  }, [initialMessage]);

  const focusInput = () => {
    // https://stackoverflow.com/a/1096938
    setTimeout(() => {
      inputRef.current!.focus();
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd = inputRef.current!.value.length;
    }, 0);
  };

  const handleEmojiSelected = (emoji: IEmojiData) => {
    setMessage(message + emoji.emoji);
    inputRef.current!.focus();
  };

  const cancel = () => {
    onCancelEditClicked();
    setMessage('');
  };

  const send = () => {
    // Should be checked as the handler can be invoked with the Enter key despite the button being disabled.
    if (!canSubmit) {
      return;
    }

    onSendClicked(sanitizedMessage);
    setMessage('');
    focusInput();
  };

  const handleTextAreaKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
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
        overflowX="hidden"
        value={message}
        onKeyPress={handleTextAreaKeyPress}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Tooltip type="submit" label={isEditing ? 'Edit' : 'Send'} hasArrow>
        <IconButton
          aria-label={isEditing ? 'Edit' : 'Send'}
          icon={isEditing ? <AiOutlineEdit /> : <BiSend />}
          colorScheme="primary"
          rounded="full"
          isDisabled={!canSubmit}
          isLoading={isSending}
          onClick={send}
        />
      </Tooltip>
      {isEditing && (
        <Tooltip type="submit" label="Cancel Editing" hasArrow>
          <IconButton aria-label="Cancel Editing" icon={<MdClose />} rounded="full" onClick={() => cancel()} />
        </Tooltip>
      )}
    </HStack>
  );
}
