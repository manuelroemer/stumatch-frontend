import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { IoFilterOutline } from 'react-icons/io5';

export interface ChatGroupFilterProps {
  filter: string;
  onFilterChanged(filter: string): void;
}

export default function ChatGroupFilter({ filter, onFilterChanged }: ChatGroupFilterProps) {
  return (
    <InputGroup m="2" size="sm" width="initial">
      <InputLeftElement>
        <Icon as={IoFilterOutline} color="gray.400" />
      </InputLeftElement>
      <Input
        placeholder="Filter conversations"
        rounded="full"
        value={filter}
        onChange={(e) => onFilterChanged(e.target.value.trim())}
      />
    </InputGroup>
  );
}
