import { Button, HStack, Icon, Tooltip } from '@chakra-ui/react';
import range from 'lodash-es/range';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

export interface PaginationProps {
  currentPage: number;
  pages: number;
  maxOptionsPerSide?: number;
  onPageChanged: (nextPage: number) => void;
}

export default function Pagination({ currentPage, pages, maxOptionsPerSide = 3, onPageChanged }: PaginationProps) {
  currentPage = Math.max(1, Math.min(currentPage, pages));
  pages = Math.max(1, pages);
  maxOptionsPerSide = Math.max(1, maxOptionsPerSide);

  const missingOptionsRangeEnd = Math.min(0, pages - currentPage - maxOptionsPerSide);
  const missingOptionsRangeStart = Math.min(0, currentPage - maxOptionsPerSide - 1);
  const rangeStart = Math.max(1, currentPage - maxOptionsPerSide + missingOptionsRangeEnd);
  const rangeEnd = Math.min(pages, currentPage + maxOptionsPerSide - missingOptionsRangeStart);
  const isOnFirstPage = currentPage === 1;
  const isOnLastPage = currentPage === pages;

  return (
    <HStack>
      <Tooltip hasArrow label="First Page">
        <Button p="0" disabled={isOnFirstPage} onClick={() => onPageChanged(1)}>
          <Icon as={GrFormPrevious} />
          <Icon as={GrFormPrevious} />
        </Button>
      </Tooltip>
      <Tooltip hasArrow label="Previous">
        <Button p="0" disabled={isOnFirstPage} onClick={() => onPageChanged(currentPage - 1)}>
          <Icon as={GrFormPrevious} />
        </Button>
      </Tooltip>
      {range(rangeStart, rangeEnd + 1).map((page) => (
        <PageLink key={page} page={page} isSelected={currentPage === page} onClick={() => onPageChanged(page)} />
      ))}
      <Tooltip hasArrow label="Next">
        <Button p="0" disabled={isOnLastPage} onClick={() => onPageChanged(currentPage + 1)}>
          <Icon as={GrFormNext} />
        </Button>
      </Tooltip>
      <Tooltip hasArrow label="Last Page">
        <Button p="0" disabled={isOnLastPage} onClick={() => onPageChanged(pages)}>
          <Icon as={GrFormNext} />
          <Icon as={GrFormNext} />
        </Button>
      </Tooltip>
    </HStack>
  );
}

function PageLink({ page, isSelected, onClick }: { page: number; isSelected: boolean; onClick: () => void }) {
  return (
    <Button
      minW="10"
      minH="10"
      p="0"
      variant={isSelected ? 'solid' : 'outline'}
      colorScheme={isSelected ? 'primary' : undefined}
      onClick={onClick}>
      {page}
    </Button>
  );
}
