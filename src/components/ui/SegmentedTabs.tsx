import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
type SegmentedTabsProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};
const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  currentTab,
  setCurrentTab,
}) => (
  <Segmented
    value={currentTab}
    onChange={(value) => setCurrentTab(value as string)}
    options={[
      { value: 'Lists', icon: <BarsOutlined className="*:w-4" /> },
      { value: 'Cards', icon: <AppstoreOutlined className="*:w-4" /> },
    ]}
  />
);

export default SegmentedTabs;
