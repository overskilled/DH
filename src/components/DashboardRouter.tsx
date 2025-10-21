"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { DepartmentService } from '@/services/departement.service'
import { DashboardHeader } from './DashboardHeader'
import { KeyMetrics } from './KeyMetrics'
import TaxDashboard from './dashboards/TaxDashboard'
import CorporateDashboard from './dashboards/CorporateDashboard'
import ConseilDashboard from './dashboards/ConseilDashboard'
import LegalDashboard from './dashboards/LegalDashboard'

interface Department {
  id: string
  name: string
  colorHex: string
  description?: string
}

interface DepartmentStats {
  totalDocuments: number
  activeDocuments: number
  totalTasks: number
  pendingTasks: number
  totalInvoices: number
  pendingInvoices: number
  totalRevenue: number
  teamMembers: number
  recentActivity: any[]
}

export default function DashboardRouter() {
  const searchParams = useSearchParams()
  const { user } = useAuthStore()
  const [department, setDepartment] = useState<Department | null>(null)
  const [stats, setStats] = useState<DepartmentStats | null>(null)
  const [loading, setLoading] = useState(true)

  const departmentParam = searchParams.get('department')

  useEffect(() => {
    const fetchDepartmentData = async () => {
      if (!departmentParam) {
        // If no department in URL, use user's department
        console.log("Dep PAram: ", departmentParam)
        if (user?.departmentId) {
            console.log("Dep user: ", user?.departmentId)
          await fetchUserDepartment(user.departmentId)
        } else {
          setLoading(false)
        }
        return
      }

      await fetchDepartmentByName(departmentParam)
    }

    fetchDepartmentData()
  }, [departmentParam, user?.departmentId])

  const fetchUserDepartment = async (departmentId: string) => {
    try {
      const deptData = await DepartmentService.getById(departmentId)
      const deptStats = await DepartmentService.getById(departmentId)
      setDepartment(deptData)
      setStats(deptStats)
    } catch (error) {
      console.error('Error fetching department:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDepartmentByName = async (departmentName: string) => {
    try {
      const deptData = await DepartmentService.getByName(departmentName)
      const deptStats = await DepartmentService.getStats(deptData.id)
      setDepartment(deptData)
      setStats(deptStats)
    } catch (error) {
      console.error('Error fetching department:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <DashboardLoading />
  }

  if (!department) {
    return <DepartmentNotFound />
  }

  const renderDashboard = () => {
    const dashboardMap: { [key: string]: JSX.Element } = {
      'Tax': <TaxDashboard department={department} stats={stats} />,
      'Corporate': <CorporateDashboard department={department} stats={stats} />,
    //   'Litigation': <LitigationDashboard department={department} stats={stats} />,
      'Conseil': <ConseilDashboard department={department} stats={stats} />,
    //   'Legal': <LegalDashboard department={department} stats={stats} />
    }

    return dashboardMap[department.name] || <DefaultDashboard department={department} stats={stats} />
  }

  return (
    <div className="space-y-6">
      {renderDashboard()}
    </div>
  )
}

function DashboardLoading() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading dashboard data...</p>
      </div>
    </div>
  )
}

function DepartmentNotFound() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Department Not Found</h3>
        <p className="text-gray-600">Please select a valid department from the navigation.</p>
      </div>
    </div>
  )
}

function DefaultDashboard({ department, stats }: { department: Department, stats: DepartmentStats | null }) {
  return (
    <div className="space-y-6">
      <DashboardHeader department={department} />
      <KeyMetrics stats={stats} />
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <TeamMembers />
      </div> */}
    </div>
  )
}