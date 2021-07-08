import { useQuery } from 'react-query';
import { getAllCategories } from '../api/post';

const key = 'categories';

export function useGetAllCategoriesQuery() {
  return useQuery([key], () => getAllCategories().then((res) => res.data));
}
