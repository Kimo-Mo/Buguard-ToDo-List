import { useQuery } from '@tanstack/react-query';
import { getAssignees } from './assignee.api';

export const GET_ASSIGNEES_QUERY_KEY = '/assignee';

export const useGetAssigneesQuery = () => {
  return useQuery({
    queryKey: [GET_ASSIGNEES_QUERY_KEY],
    queryFn: getAssignees,
  });
};
