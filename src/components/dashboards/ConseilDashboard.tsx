export default function ConseilDashboard({ department, stats }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-2">Conseil</h3>
          <p className="text-gray-600">Manage system users and permissions</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-2">System Analytics</h3>
          <p className="text-gray-600">Overall system performance metrics</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-2">Department Overview</h3>
          <p className="text-gray-600">Cross-department performance</p>
        </div>
      </div>
    </div>
  );
}