import React, { MouseEventHandler, useState } from "react";

/* Props interface */
interface TabSwitcherProps {
  children: [React.FC<TabProps>];
}

interface TabProps {
  title: string;
  content: JSX.Element;
}

interface TabsBarItemProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  title: string;
  active: boolean;
}

/* Smaller components */
const Tab: React.FC<TabProps> = ({ content }) => {
  return (
    <div className="tab-content-container">
      <div className="tab-content">{content}</div>
    </div>
  );
};

const TabsBarItem: React.FC<TabsBarItemProps> = ({ title }) => {
  return <div className="tabs-bar-item">{title}</div>;
};

/* main tab switcher component */
export const TabSwitcher: React.FC<TabSwitcherProps> & {
  Tab: React.FC<TabProps>;
} = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(() => 0);

  return (
    <div className="tab-switcher-container">
      <div className="tab-switcher-tabs-bar">
        {children.map((each, ind) => (
          <TabsBarItem
            onClick={() => {
              setActiveTab(ind);
            }}
            active={ind === activeTab}
            key={each.defaultProps!.title!}
            title={each.defaultProps!.title!}
          />
        ))}
      </div>
      {children[activeTab]}
    </div>
  );
};

TabSwitcher.Tab = Tab;
