export default function Page() {
  return (
    <div className="w-full bg-white p-8 rounded-xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome to Sterling & Associates
        </h1>
        <p className="text-gray-600">Legal Case Management Dashboard</p>
      </header>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
          <span className="material-symbols-outlined text-4xl text-blue-600">
            folder_open
          </span>
          <h3 className="text-2xl font-bold mt-2">247</h3>
          <p className="text-gray-600">Total Cases</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
          <span className="material-symbols-outlined text-4xl text-yellow-600">
            pending
          </span>
          <h3 className="text-2xl font-bold mt-2">84</h3>
          <p className="text-gray-600">Pending Cases</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
          <span className="material-symbols-outlined text-4xl text-green-600">
            task_alt
          </span>
          <h3 className="text-2xl font-bold mt-2">163</h3>
          <p className="text-gray-600">Completed Cases</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
          <span className="material-symbols-outlined text-4xl text-purple-600">
            schedule
          </span>
          <h3 className="text-2xl font-bold mt-2">12</h3>
          <p className="text-gray-600">Upcoming Deadlines</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white border rounded-xl p-6 mb-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Case Updates</h2>
              <span className="material-symbols-outlined cursor-pointer hover:text-blue-600">
                refresh
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <span className="material-symbols-outlined mr-3">
                  description
                </span>
                <div>
                  <h4 className="font-semibold">Johnson vs. Smith Corp</h4>
                  <p className="text-sm text-gray-600">Updated 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <span className="material-symbols-outlined mr-3">
                  description
                </span>
                <div>
                  <h4 className="font-semibold">Roberts Estate Planning</h4>
                  <p className="text-sm text-gray-600">Updated 5 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upcoming Deadlines</h2>
              <span className="material-symbols-outlined cursor-pointer hover:text-blue-600">
                calendar_today
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-all">
                <span className="material-symbols-outlined text-red-600 mr-3">
                  warning
                </span>
                <div>
                  <h4 className="font-semibold">Davis Appeal Filing</h4>
                  <p className="text-sm text-gray-600">Due in 2 days</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-all">
                <span className="material-symbols-outlined text-yellow-600 mr-3">
                  schedule
                </span>
                <div>
                  <h4 className="font-semibold">Thompson Discovery</h4>
                  <p className="text-sm text-gray-600">Due in 5 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all">
                <span className="material-symbols-outlined mr-2">add</span>
                New Case
              </button>
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-green-700 transition-all">
                <span className="material-symbols-outlined mr-2">
                  person_add
                </span>
                Add Client
              </button>
              <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-all">
                <span className="material-symbols-outlined mr-2">
                  group_add
                </span>
                Assign Lawyer
              </button>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all">
                <p className="font-semibold">New case assigned</p>
                <p className="text-sm text-gray-600">Williams vs. Tech Corp</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-all">
                <p className="font-semibold">Document update</p>
                <p className="text-sm text-gray-600">
                  Johnson case brief updated
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
