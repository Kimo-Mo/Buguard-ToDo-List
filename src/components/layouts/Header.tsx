import { Avatar, Input, Select } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
const { Search } = Input;

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}
const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {
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
          <Avatar icon={<UserOutlined />} />
        </div>
        <div className="flex items-center md:items-start flex-row md:flex-col gap-2 md:gap-0">
          <p>Workspace</p>
          <Select
            defaultValue="lucy"
            variant="borderless"
            style={{ width: 120 }}
            // onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'username', label: 'username' },
            ]}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
