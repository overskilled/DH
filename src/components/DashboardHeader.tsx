interface DashboardHeaderProps {
    department: {
        name: string
        colorHex: string
        description?: string
    }
}

export function DashboardHeader({ department }: DashboardHeaderProps) {
    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: department.colorHex }}
                        />
                        <h1 className="text-3xl font-bold">{department.name} Department</h1>
                    </div>
                    <p className="text-gray-300 text-lg">
                        {department.description || 'Department overview and performance metrics'}
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-300">Last updated</div>
                    <div className="text-lg font-semibold">{new Date().toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    )
}