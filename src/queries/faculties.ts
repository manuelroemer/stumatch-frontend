import { useQuery } from 'react-query';
import { getAllFaculties } from '../api/faculty';

const key = 'faculties';

export function useGetAllFacultiesQuery() {
  return useQuery([key], () => getAllFaculties().then((res) => res.data));
}
