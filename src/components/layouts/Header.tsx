import { Avatar, Input, /*Segmented,*/ Select, type GetProps } from 'antd';
import {
  BellOutlined,
  // MoonOutlined,
  // SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
// import { useTheme } from '@/services/context';
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const Header = () => {
  // const { setTheme } = useTheme();
  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <nav className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 bg-card py-3 px-6 m-6 shadow-xs rounded-[37px] ">
      <Search
        placeholder="search project..."
        allowClear
        variant="borderless"
        onSearch={onSearch}
        style={{ maxWidth: 200 }}
      />
      <div className="flex gap-4 flex-col md:flex-row justify-center items-center">
        <div className="flex gap-4">
          {/* <Segmented
            style={{ backgroundColor: 'var(--c-background)',border : '1px solid var(--c-border)' }}
            shape="round"
            options={[
              { value: 'light', icon: <SunOutlined /> },
              { value: 'dark', icon: <MoonOutlined /> },
            ]}
            onChange={(value) => setTheme(value as 'light' | 'dark')}
          /> */}
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
