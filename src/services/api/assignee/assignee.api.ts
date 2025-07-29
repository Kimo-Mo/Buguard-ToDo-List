import { ApiClient } from '../ClientApi';

export const getAssignees = async () => {
  const res = await ApiClient.get('/assignee');
  return res.data;
};
