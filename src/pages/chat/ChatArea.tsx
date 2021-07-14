import { Center, Spinner } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useState } from 'react';
import { ChatMessage } from '../../api/chatMessages';
import { useGetChatGroupQuery } from '../../queries/chatGroups';
import { usePostChatGroupChatMessageMutation, usePutChatMessageMutation } from '../../queries/chatMessages';
import ChatMessageInputLayout from './ChatMessageInputLayout';
import ChatMessagesContainer from './ChatMessagesContainer';
import ChatMessagesHeader from './ChatMessagesHeader';

export interface ChatAreaProps {
  chatGroupId: string;
}

export default function ChatArea({ chatGroupId }: ChatAreaProps) {
  const [message, setMessage] = useState('');
  const [messageToEdit, setMessageToEdit] = useState<ChatMessage | null>(null);
  const chatGroupQuery = useGetChatGroupQuery(chatGroupId);
  const postChatMessageMutation = usePostChatGroupChatMessageMutation(chatGroupId);
  const putChatMessageMutation = usePutChatMessageMutation();

  const cancelEditing = useCallback(() => {
    setMessageToEdit(null);
    setMessage('');
  }, [setMessageToEdit, setMessage]);

  const handleChatMessageEdit = useCallback(
    (chatMessage: ChatMessage) => {
      setMessageToEdit(chatMessage);
      setMessage(chatMessage.textContent);
    },
    [setMessage, setMessageToEdit],
  );

  const handleSendClicked = useCallback(
    (message: string) => {
      if (messageToEdit) {
        putChatMessageMutation.mutate({ id: messageToEdit.id, body: { textContent: message } });
        cancelEditing();
      } else {
        postChatMessageMutation.mutate({ textContent: message });
        setMessage('');
      }
    },
    [message, messageToEdit, putChatMessageMutation, postChatMessageMutation, cancelEditing, setMessage],
  );

  return (
    <>
      {chatGroupQuery.isLoading && (
        <Center h="100%">
          <Spinner emptyColor="gray.200" color="primary.500" size="xl" />
        </Center>
      )}
      {chatGroupQuery.data && (
        <>
          <ChatMessagesHeader chatGroup={chatGroupQuery.data.result} />
          <ChatMessagesContainer chatGroup={chatGroupQuery.data.result} onChatMessageEdit={handleChatMessageEdit} />
          <ChatMessageInputLayout
            initialMessage={message}
            isSending={postChatMessageMutation.isLoading || putChatMessageMutation.isLoading}
            isEditing={!!messageToEdit}
            onSendClicked={handleSendClicked}
            onCancelEditClicked={cancelEditing}
          />
        </>
      )}
    </>
  );
}
