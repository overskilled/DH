// components/dashboards/TaxDashboard.tsx
import { DashboardHeader } from '../DashboardHeader'
import { KeyMetrics } from '../KeyMetrics'

export default function TaxDashboard({ department, stats }: any) {
    return (
        <div className="space-y-6">
            <DashboardHeader department={department} />
            <KeyMetrics stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold mb-4">Tax Compliance Timeline</h3>
                        <div className="space-y-4">
                            <TimelineItem title="Q1 Tax Returns" status="completed" date="Jan 15, 2024" />
                            <TimelineItem title="VAT Declaration" status="in-progress" date="Feb 28, 2024" />
                            <TimelineItem title="Annual Tax Planning" status="pending" date="Mar 15, 2024" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold mb-4">Tax Categories</h3>
                        <div className="space-y-3">
                            <CategoryItem name="Corporate Tax" count={12} color="bg-blue-500" />
                            <CategoryItem name="VAT" count={8} color="bg-green-500" />
                            <CategoryItem name="International Tax" count={5} color="bg-purple-500" />
                            <CategoryItem name="Tax Disputes" count={3} color="bg-red-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TimelineItem({ title, status, date }: any) {
    const statusColors: any = {
        completed: 'bg-green-500',
        'in-progress': 'bg-blue-500',
        pending: 'bg-gray-400'
    }

    return (
        <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
            <div className="flex-1">
                <div className="font-medium">{title}</div>
                <div className="text-sm text-gray-500">{date}</div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${status === 'completed' ? 'bg-green-100 text-green-800' :
                    status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                }`}>
                {status}
            </span>
        </div>
    )
}

function CategoryItem({ name, count, color }: any) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="font-medium">{name}</span>
            </div>
            <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">{count}</span>
        </div>
    )
}