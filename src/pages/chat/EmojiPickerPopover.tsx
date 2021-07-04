import { Popover, PopoverTrigger, IconButton, PopoverContent, Tooltip } from '@chakra-ui/react';
import EmojiPicker, { IEmojiData } from 'emoji-picker-react';
import { useState } from 'react';
import { HiOutlineEmojiHappy } from 'react-icons/hi';

export interface EmojiPickerButtonProps {
  onEmojiSelected(emoji: IEmojiData): void;
}

export default function EmojiPickerButton({ onEmojiSelected }: EmojiPickerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const handleEmojiClick = (_: unknown, emoji: IEmojiData) => {
    onEmojiSelected(emoji);
    close();
  };

  return (
    <Popover isOpen={isOpen} onClose={close} strategy="fixed" placement="top-start">
      <PopoverTrigger>
        <Tooltip label="Pick Emoji">
          <IconButton
            aria-label="Pick Emoji"
            icon={<HiOutlineEmojiHappy />}
            rounded="full"
            onClick={() => setIsOpen(!isOpen)}
          />
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent>
        <EmojiPicker native pickerStyle={{ width: 'auto' }} onEmojiClick={handleEmojiClick} />
      </PopoverContent>
    </Popover>
  );
}
