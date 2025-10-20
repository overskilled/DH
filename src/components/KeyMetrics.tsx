// components/KeyMetrics.tsx
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KeyMetricsProps {
    stats: any
}

export function KeyMetrics({ stats }: KeyMetricsProps) {
    const metrics = [
        {
            label: 'Total Documents',
            value: stats?.totalDocuments || 0,
            change: '+12%',
            trend: 'up' as const,
            icon: '📄'
        },
        {
            label: 'Active Tasks',
            value: stats?.pendingTasks || 0,
            change: '-5%',
            trend: 'down' as const,
            icon: '✅'
        },
        {
            label: 'Pending Invoices',
            value: stats?.pendingInvoices || 0,
            change: '+8%',
            trend: 'up' as const,
            icon: '💰'
        },
        {
            label: 'Team Members',
            value: stats?.teamMembers || 0,
            change: '+2%',
            trend: 'up' as const,
            icon: '👥'
        }
    ]

    const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
        switch (trend) {
            case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />
            case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />
            default: return <Minus className="w-4 h-4 text-gray-500" />
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl">{metric.icon}</span>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${metric.trend === 'up' ? 'bg-green-50 text-green-700' :
                                metric.trend === 'down' ? 'bg-red-50 text-red-700' :
                                    'bg-gray-50 text-gray-700'
                            }`}>
                            {getTrendIcon(metric.trend)}
                            {metric.change}
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                    <p className="text-gray-600 text-sm">{metric.label}</p>
                </div>
            ))}
        </div>
    )
}