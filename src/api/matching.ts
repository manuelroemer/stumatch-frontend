export interface MatchRequest {
  // userId: string;
  // partnerId?: string;
  status: 'pending' | 'acceptedByMe' | 'accepted' | 'declinedByMe' | 'declinedByPartner' | 'matched';
}

export const matchingData: Array<MatchRequest> = [{ status: 'pending' }, { status: 'pending' }, { status: 'matched' }];
