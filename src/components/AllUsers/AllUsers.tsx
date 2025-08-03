import { useGetAssigneesQuery } from '@/services/api';
import type { IAssignee } from '@/services/types';
import { Avatar } from 'antd';
import { ErrorNotFound, LoadingComponent } from '../ui';

const AllUsers = () => {
  const { data: assignees, error, isLoading } = useGetAssigneesQuery();

  return (
    <div>
      <h1 className="text-lg shadow-sm rounded-md bg-card px-6 py-3">
        All Users
      </h1>
      {error && <ErrorNotFound />}
      {!error && isLoading && <LoadingComponent />}
      {!error && !isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {assignees.map((user: IAssignee) => (
            <div
              key={user.id}
              className="flex flex-col items-center gap-y-3 bg-card rounded-md shadow-sm p-4">
              <Avatar
                src={user.avatar}
                className="!size-8 !bg-description/50"
              />
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
