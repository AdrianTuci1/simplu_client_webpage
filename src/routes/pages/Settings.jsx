import { businessConfig } from '../../config/businessConfig';

const Settings = () => (
  <div className="settings-page">
    <h1>Settings</h1>
    <div className="settings-content">
      <section>
        <h2>Business Information</h2>
        <p>Business Type: {businessConfig.type}</p>
        <p>Active Pages: {businessConfig.activePages.join(', ')}</p>
      </section>
      <section>
        <h2>Home Layout Configuration</h2>
        <p>Current Layout: [{businessConfig.homeLayout.join(', ')}]</p>
      </section>
    </div>
  </div>
);

export default Settings; 