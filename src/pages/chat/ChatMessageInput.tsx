import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { HStack, IconButton, Textarea, Tooltip } from '@chakra-ui/react';
import { IEmojiData } from 'emoji-picker-react';
import { BiSend } from 'react-icons/bi';
import isEmpty from 'lodash-es/isEmpty';
import trim from 'lodash-es/trim';
import countBy from 'lodash-es/countBy';
import EmojiPickerButton from './EmojiPickerPopover';

export default function ChatMessageInput() {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [typedMessage, setTypedMessage] = useState('');
  const sanitizedMessage = trim(typedMessage);
  const canSubmit = !isEmpty(sanitizedMessage);
  const typedLines = countBy(typedMessage)['\n'] + 1 || 1;

  const handleEmojiSelected = (emoji: IEmojiData) => {
    setTypedMessage(typedMessage + emoji.emoji);
    inputRef.current!.focus();
  };

  const handleTypedMessageChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTypedMessage(e.target.value);
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

    alert(sanitizedMessage);
  };

  return (
    <HStack
      spacing="4"
      py="4"
      px="8"
      bg="white"
      overflowY="scroll"
      // Dirty hack: To get the correct padding as the chat messages above we need the system's
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
        resize="none"
        rows={Math.min(5, typedLines)}
        value={typedMessage}
        onKeyPress={handleTextAreaKeyPress}
        onChange={handleTypedMessageChanged}
      />
      <Tooltip type="submit" label="Send" hasArrow>
        <IconButton
          aria-label="Send"
          icon={<BiSend />}
          colorScheme="primary"
          rounded="full"
          isDisabled={!canSubmit}
          onClick={send}
        />
      </Tooltip>
    </HStack>
  );
}
