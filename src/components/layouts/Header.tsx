import { Avatar, Input, Select, type SelectProps } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import type { IAssignee } from '@/services/types';
import { useGetAssigneesQuery } from '@/services/api';
import { useMemo, useState } from 'react';
const { Search } = Input;

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}
const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {
  const { data: assignees } = useGetAssigneesQuery();
  const [assigneeAvatar, setAssigneeAvatar] = useState<string>('');
  const assigneeOptions: SelectProps['options'] = useMemo(() => {
    return assignees?.map((assignee: IAssignee) => ({
      value: assignee.id,
      label: <span>{assignee.name}</span>,
    }));
  }, [assignees]);
  const handleSelectChange = (value: string) => {
    const assignee = assignees?.find(
      (assignee: IAssignee) => assignee.id === value
    );
    setAssigneeAvatar(assignee?.avatar || '');
  };
  return (
    <nav className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 bg-card py-3 px-6 m-6 shadow-xs rounded-[37px] ">
      <Search
        placeholder="search project..."
        allowClear
        variant="borderless"
        style={{ maxWidth: 200 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex gap-4 flex-col md:flex-row justify-center items-center">
        <div className="flex gap-4">
          <BellOutlined className="*:w-6 *:h-6" />
          {assigneeAvatar.length === 0 ? (
            <Avatar icon={<UserOutlined />} />
          ) : (
            <Avatar
              src={assigneeAvatar}
              className="!bg-description/50"
            />
          )}
        </div>
        <div className="flex items-center md:items-start flex-row md:flex-col gap-2 md:gap-0">
          <p>Workspace</p>
          <Select
            variant="borderless"
            placeholder="Select assignee"
            options={assigneeOptions}
            style={{ width: 120 }}
            className="*:!p-0"
            onChange={(value) => handleSelectChange(value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
