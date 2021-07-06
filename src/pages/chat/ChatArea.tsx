import { useCallback } from 'react';
import { useState } from 'react';
import { ChatMessage } from '../../api/chatMessages';
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
      <ChatMessagesHeader chatGroupId={chatGroupId} />
      <ChatMessagesContainer chatGroupId={chatGroupId} onChatMessageEdit={handleChatMessageEdit} />
      <ChatMessageInputLayout
        initialMessage={message}
        isSending={postChatMessageMutation.isLoading || putChatMessageMutation.isLoading}
        isEditing={!!messageToEdit}
        onSendClicked={handleSendClicked}
        onCancelEditClicked={cancelEditing}
      />
    </>
  );
}
