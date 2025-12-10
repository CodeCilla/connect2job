const ProfileTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <ul className="tab-list">
      {tabs.map((tab) => (
        <li
          key={tab.id}
          className={activeTab === tab.id ? 'active' : ''}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </li>
      ))}
    </ul>
  );
};

export default ProfileTabs;

