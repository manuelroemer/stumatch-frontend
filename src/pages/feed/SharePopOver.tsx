import {
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Input,
  useClipboard,
  VStack,
  HStack,
} from '@chakra-ui/react';
import {
  EmailShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  TelegramIcon,
  ViberIcon,
  WhatsappIcon,
  FacebookMessengerShareButton,
} from 'react-share';

import { AiOutlineShareAlt } from 'react-icons/ai';

export interface SharePopOverProps {
  permalink: string;
}

export default function SharePopOver({ permalink }: SharePopOverProps) {
  const { hasCopied, onCopy } = useClipboard(permalink);
  const title = 'Check this out (shared from sTUMatch): ';
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <IconButton size="sm" aria-label="Share" icon={<AiOutlineShareAlt />} fontSize="17" />
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Share</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <VStack>
                <HStack>
                  <Flex mb={2}>
                    <Input width="" value={permalink} isReadOnly />
                    <Button onClick={onCopy} ml={2}>
                      {hasCopied ? 'Copied' : 'Copy'}
                    </Button>
                  </Flex>
                </HStack>
                <HStack>
                  <WhatsappShareButton url={permalink} title={title}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <TelegramShareButton url={permalink} title={title}>
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                  <ViberShareButton url={permalink} title={title}>
                    <ViberIcon size={32} round />
                  </ViberShareButton>
                  <FacebookMessengerShareButton appId="521270401588372" url={permalink}>
                    <FacebookMessengerIcon size={32} round />
                  </FacebookMessengerShareButton>
                  <LinkedinShareButton url={permalink}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <TwitterShareButton url={permalink} title={title}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <EmailShareButton url={permalink} body={title}>
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </HStack>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}
