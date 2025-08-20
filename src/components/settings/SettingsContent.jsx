const SettingsContent = ({ type, title }) => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="text-center py-8">
        <p className="text-gray-500">
          {title} en desarrollo...
        </p>
      </div>
    </div>
  </div>
);

export default SettingsContent;
