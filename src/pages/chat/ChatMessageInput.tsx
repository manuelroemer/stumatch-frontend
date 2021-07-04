import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { HStack, IconButton, Input, Tooltip } from '@chakra-ui/react';
import { IEmojiData } from 'emoji-picker-react';
import { BiSend } from 'react-icons/bi';
import isEmpty from 'lodash-es/isEmpty';
import trim from 'lodash-es/trim';
import EmojiPickerButton from './EmojiPickerPopover';

export default function ChatMessageInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [typedMessage, setTypedMessage] = useState('');
  const sanitizedMessage = trim(typedMessage);
  const canSubmit = !isEmpty(sanitizedMessage);

  const handleEmojiSelected = (emoji: IEmojiData) => {
    setTypedMessage(typedMessage + emoji.emoji);
    inputRef.current!.focus();
  };

  const handleTypedMessageChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setTypedMessage(e.target.value);
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Should be checked as the handler can be invoked with the Enter key despite the button being disabled.
    if (!canSubmit) {
      return;
    }

    alert(sanitizedMessage);
  };

  return (
    <form onSubmit={handleSend} action="none">
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
        <Input ref={inputRef} rounded="full" autoFocus value={typedMessage} onChange={handleTypedMessageChanged} />
        <Tooltip type="submit" label="Send" hasArrow>
          <IconButton
            aria-label="Send"
            icon={<BiSend />}
            colorScheme="primary"
            rounded="full"
            type="submit"
            isDisabled={!canSubmit}
          />
        </Tooltip>
      </HStack>
    </form>
  );
}
