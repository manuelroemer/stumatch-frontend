import { ApiObject } from './conventions';

export interface ChatMessage extends ApiObject {
  chatGroupId: string;
  userId: string;
  textContent: string;
  isDeleted: boolean;
}
