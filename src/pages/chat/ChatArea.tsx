import { useCallback } from 'react';
import { useState } from 'react';
import { ChatMessage } from '../../api/chatMessages';
import { usePostChatGroupChatMessageMutation } from '../../queries/chatMessages';
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

  const cancelEditing = () => {
    setMessageToEdit(null);
    setMessage('');
  };

  const handleChatMessageEdit = useCallback((chatMessage: ChatMessage) => {
    setMessageToEdit(chatMessage);
    setMessage(chatMessage.textContent);
  }, []);

  return (
    <>
      <ChatMessagesHeader chatGroupId={chatGroupId} />
      <ChatMessagesContainer chatGroupId={chatGroupId} onChatMessageEdit={handleChatMessageEdit} />
      <ChatMessageInputLayout
        message={message}
        isSending={postChatMessageMutation.isLoading}
        isEditing={!!messageToEdit}
        cancelEditing={cancelEditing}
        onMessageChanged={setMessage}
        onSendClicked={() => {
          postChatMessageMutation.mutate({ textContent: message });
          setMessage('');
        }}
      />
    </>
  );
}
