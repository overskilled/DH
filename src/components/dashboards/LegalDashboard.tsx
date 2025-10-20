export default function LegalDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Legal Department Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-2">Active Cases</h3>
          <p className="text-2xl font-bold text-blue-600">24</p>
          <p className="text-gray-600">Currently handling</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-2">Upcoming Hearings</h3>
          <p className="text-2xl font-bold text-orange-600">5</p>
          <p className="text-gray-600">Next 7 days</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-2">Document Review</h3>
          <p className="text-2xl font-bold text-red-600">12</p>
          <p className="text-gray-600">Pending review</p>
        </div>
      </div>
    </div>
  );
}