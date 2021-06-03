export interface MatchRequest {
  // userId: string;
  // partnerId?: string;
  status:
    | 'pending'
    | 'acceptedByMe'
    | 'accepted'
    | 'acceptedByPartner'
    | 'declinedByMe'
    | 'declinedByPartner'
    | 'matched';
}

export const matchingData: Array<MatchRequest> = [
  { status: 'pending' },
  { status: 'pending' },
  { status: 'matched' },
  { status: 'accepted' },
  { status: 'acceptedByMe' },
  { status: 'acceptedByPartner' },
  { status: 'declinedByMe' },
  { status: 'declinedByPartner' },
];
