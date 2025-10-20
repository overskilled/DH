import { DashboardHeader } from '../DashboardHeader'
import { KeyMetrics } from '../KeyMetrics'

export default function CorporateDashboard({ department, stats }: any) {
    return (
        <div className="space-y-6">
            <DashboardHeader department={department} />
            <KeyMetrics stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">M&A Pipeline</h3>
                    <div className="space-y-4">
                        <PipelineItem company="TechCorp Inc." stage="Due Diligence" value="$50M" />
                        <PipelineItem company="StartupXYZ" stage="Negotiation" value="$15M" />
                        <PipelineItem company="GlobalBiz Ltd" stage="Initial Review" value="$120M" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Corporate Governance</h3>
                    <div className="space-y-3">
                        <GovernanceItem title="Board Meetings" completed={4} total={12} />
                        <GovernanceItem title="Compliance Reviews" completed={8} total={8} />
                        <GovernanceItem title="Shareholder Reports" completed={2} total={4} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function PipelineItem({ company, stage, value }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
            <div>
                <div className="font-semibold">{company}</div>
                <div className="text-sm text-gray-600">{stage}</div>
            </div>
            <div className="text-right">
                <div className="font-bold text-blue-600">{value}</div>
                <div className="text-xs text-gray-500">Deal Size</div>
            </div>
        </div>
    )
}

function GovernanceItem({ title, completed, total }: any) {
    const percentage = (completed / total) * 100
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="font-medium">{title}</span>
                <span className="text-gray-600">{completed}/{total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}