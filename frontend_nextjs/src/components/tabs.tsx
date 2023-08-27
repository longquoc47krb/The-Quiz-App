import React, { useEffect, useState } from 'react';

const Tab = ({ label, selected, onClick }) => {
  return (
    <div
      className={`tab ${
        selected ? 'text-darkPrimaryActive rounded-full bg-darkViolet' : ''
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

const Tabs = ({ tabs, children, onSwitchTab }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    onSwitchTab(index);
    const tabHash = `#${index + 1}`; // Use a meaningful hash value
    window.location.hash = tabHash;
  };
  useEffect(() => {
    // Update the selected tab based on the URL hash
    const { hash } = window.location;
    const tabIndex = tabs.findIndex(
      (tab, index) => hash === `#tab${index + 1}`,
    );
    if (tabIndex !== -1) {
      setSelectedTab(tabIndex);
    }
  }, [tabs]);
  return (
    <div className="flex flex-col w-full px-4">
      <div className="flex ">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab}
            selected={index === selectedTab}
            onClick={() => handleTabClick(index)}
          />
        ))}
      </div>
      {children}
    </div>
  );
};

export default Tabs;
