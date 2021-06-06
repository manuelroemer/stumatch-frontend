import { User } from './users';

export interface MatchRequest {
  //userId: string;
  partner?: User;
  status:
    | 'pending'
    | 'acceptedByMe'
    | 'accepted'
    | 'acceptedByPartner'
    | 'declinedByMe'
    | 'declinedByPartner'
    | 'matched';
}
const partner = {
  id: '00000000-0000-1000-8000-000000000000',
  firstName: 'sTUMatch',
  lastName: 'User',
  createdOn: '',
  modifiedOn: '',
  roles: [],
};

export const matchingData: Array<MatchRequest> = [
  { status: 'pending' },
  { status: 'pending' },
  { status: 'matched', partner },
  { status: 'accepted', partner },
  { status: 'acceptedByMe', partner },
  { status: 'acceptedByPartner', partner },
  { status: 'declinedByMe', partner },
  { status: 'declinedByPartner', partner },
];
