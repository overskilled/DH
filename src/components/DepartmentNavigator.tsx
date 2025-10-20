// components/DepartmentNavigator.tsx
"use client"

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { DepartmentService } from '@/services/departement.service'

interface Department {
    id: string
    name: string
    colorHex: string
}

interface DepartmentNavigatorProps {
    currentDepartment?: string
    onDepartmentChange: (department: Department) => void
}

export default function DepartmentNavigator({ currentDepartment, onDepartmentChange }: DepartmentNavigatorProps) {
    const [departments, setDepartments] = useState<Department[]>([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Fetch departments from API
        const fetchDepartments = async () => {
            try {
                const response = await DepartmentService.getAll()
                setDepartments(response)
            } catch (error) {
                console.error('Error fetching departments:', error)
            }
        }

        fetchDepartments()
    }, [])

    const currentDept = departments.find(dept => dept.name === currentDepartment) || departments[0]
    console.log("Departement: ", departments)

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            >
                {currentDept && (
                    <>
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: currentDept.colorHex }}
                        />
                        <span className="font-medium">{currentDept.name}</span>
                    </>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {departments.map((dept) => (
                        <button
                            key={dept.id}
                            onClick={() => {
                                onDepartmentChange(dept)
                                setIsOpen(false)
                            }}
                            className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: dept.colorHex }}
                            />
                            <span className="font-medium">{dept.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}