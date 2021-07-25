import React from "react";

interface StackLayoutProps {
  width: string;
  height: string;
}

const Item: React.FC = ({ children }) => {
  return <div className={`stack-layout-items`}>{children}</div>;
};

export const StackLayout: React.FC<StackLayoutProps> & { Item: React.FC } = ({
  width,
  height,
  children,
}) => {
  return (
    <div style={{ width, height }} className="stack-layout-wrapper">
      <div className="stack-layout">{children}</div>
    </div>
  );
};

StackLayout.Item = Item;
