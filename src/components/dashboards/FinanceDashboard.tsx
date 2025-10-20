export default function FinanceDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Finance Department Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-2">Revenue</h3>
          <p className="text-2xl font-bold text-green-600">$125,430</p>
          <p className="text-gray-600">This month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-2">Outstanding Invoices</h3>
          <p className="text-2xl font-bold text-yellow-600">$45,200</p>
          <p className="text-gray-600">To be collected</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-2">Expenses</h3>
          <p className="text-2xl font-bold text-red-600">$28,750</p>
          <p className="text-gray-600">This month</p>
        </div>
      </div>
    </div>
  );
}