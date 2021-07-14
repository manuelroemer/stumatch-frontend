import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import debounce from 'lodash-es/debounce';
import { IoFilterOutline } from 'react-icons/io5';

export interface ChatGroupFilterProps {
  onFilterChanged(filter: string): void;
}

export default function ChatGroupFilter({ onFilterChanged }: ChatGroupFilterProps) {
  const handleChange = debounce(onFilterChanged, 250);

  return (
    <InputGroup m="2" size="sm" width="initial">
      <InputLeftElement>
        <Icon as={IoFilterOutline} color="gray.400" />
      </InputLeftElement>
      <Input
        placeholder="Filter conversations"
        rounded="full"
        onChange={(e) => {
          const filter = e.target.value.trim();
          handleChange(filter);
        }}
      />
    </InputGroup>
  );
}
