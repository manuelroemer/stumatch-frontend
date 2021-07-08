import { useQuery } from 'react-query';
import { getAllFaculties } from '../api/faculty';

export const facultiesQueryKey = 'faculties';

export function useGetAllFacultiesQuery() {
  return useQuery([facultiesQueryKey], () => getAllFaculties().then((res) => res.data));
}
