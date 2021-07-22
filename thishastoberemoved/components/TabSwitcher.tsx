import React, { MouseEventHandler, useState } from "react";

export interface TabData {
  title: string;
  content: React.ReactNode;
}

/* Props interface */
interface TabSwitcherProps {
  tabs: Array<TabData>;
}

interface TabProps {
  title: string;
  children: React.ReactNode;
}

interface TabsBarItemProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  title: string;
  active: boolean;
}

/* Smaller components */
const Tab: React.FC<TabProps> = ({ children }) => {
  return (
    <div className="tab-content-container">
      <div className="tab-content">{children}</div>
    </div>
  );
};

const TabsBarItem: React.FC<TabsBarItemProps> = ({
  title,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={(e) => onClick(e)}
      className={`tabs-bar-item${active ? " tabs-bar-item-active" : ""}`}
    >
      {title}
    </div>
  );
};

/* main tab switcher component */
export const TabSwitcher: React.FC<TabSwitcherProps> & {
  Tab: React.FC<TabProps>;
} = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(() => 0);

  return (
    <div className="tab-switcher-container">
      <div className="tab-switcher-tabs-bar">
        {tabs.map((each, ind) => (
          <TabsBarItem
            onClick={() => {
              setActiveTab(ind);
            }}
            active={ind === activeTab}
            key={each.title}
            title={each.title}
          />
        ))}
      </div>
      <TabSwitcher.Tab title={tabs[activeTab].title}>
        {tabs[activeTab].content}
      </TabSwitcher.Tab>
    </div>
  );
};

TabSwitcher.Tab = Tab;
