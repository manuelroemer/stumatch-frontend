import { useState } from 'react';
import { usePostChatGroupChatMessageMutation } from '../../queries/chatMessages';
import ChatMessageInputLayout from './ChatMessageInputLayout';
import ChatMessagesContainer from './ChatMessagesContainer';
import ChatMessagesHeader from './ChatMessagesHeader';

export interface ChatAreaProps {
  chatGroupId: string;
}

export default function ChatArea({ chatGroupId }: ChatAreaProps) {
  const [message, setMessage] = useState('');
  const postChatMessageMutation = usePostChatGroupChatMessageMutation(chatGroupId);

  return (
    <>
      <ChatMessagesHeader chatGroupId={chatGroupId} />
      <ChatMessagesContainer chatGroupId={chatGroupId} />
      <ChatMessageInputLayout
        message={message}
        isSending={postChatMessageMutation.isLoading}
        onMessageChanged={setMessage}
        onSendClicked={() => {
          postChatMessageMutation.mutate({ textContent: message });
          setMessage('');
        }}
      />
    </>
  );
}
