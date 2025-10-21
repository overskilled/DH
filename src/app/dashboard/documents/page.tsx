"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

import { DepartmentBadge } from '@/components/DepartmentBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { UserAvatar } from '@/components/UserAvatar';
import { hasPermission } from '@/lib/permissions';
import { useRouter } from 'next/navigation';
import { DocumentsService } from '@/services/document.service';
import { ClientService } from '@/services/client.service';
import { DepartmentService } from '@/services/departement.service';
import { useAuthStore } from '@/stores/useAuthStore';

const page = () => {
    const { user, accessToken, logout } = useAuthStore();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [documents, setDocuments] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        // Debounced search
        const timeoutId = setTimeout(() => {
            loadData();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, filterDepartment, filterStatus]);

    const loadData = async () => {
        try {
            setLoading(true);
            
            // Load documents with filters
            const documentsData = searchTerm 
                ? await DocumentsService.search(searchTerm, { page: 1, limit: 50 }, { 
                    status: filterStatus !== 'all' ? filterStatus.toUpperCase() : undefined,
                    departmentId: filterDepartment !== 'all' ? filterDepartment : undefined
                  })
                : await DocumentsService.getAll({ page: 1, limit: 50 }, {
                    status: filterStatus !== 'all' ? filterStatus.toUpperCase() : undefined,
                    departmentId: filterDepartment !== 'all' ? filterDepartment : undefined
                  });

            setDocuments(documentsData.data || []);

            // Load clients and departments if not already loaded
            if (clients.length === 0) {
                const clientsData = await ClientService.getAll();
                setClients(clientsData.data || []);
            }

            if (departments.length === 0) {
                const departmentsData = await DepartmentService.getAll();
                setDepartments(departmentsData || []);
            }

        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user || !hasPermission(user, 'dossier:view')) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">You don't have permission to view document.</p>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Documents</h1>
                    <p className="text-muted-foreground">
                        Manage all your legal cases and matters
                    </p>
                </div>
                {hasPermission(user, 'dossier:create') && (
                    <Button onClick={() => router.push('/dashboard/documents/new')}>
                        <Plus className="h-4 w-4" />
                        New Document
                    </Button>
                )}
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search documents..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Departments" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                {departments.map(dept => (
                                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="ARCHIVED">Archived</SelectItem>
                                <SelectItem value="CLOSED">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* documents Grid */}
            {loading ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading documents...</p>
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {documents.map((document) => {
                        const client = clients.find(c => c.id === document.clientId);
                        const progress = document.progress || 0;
                        const isOverBudget = progress > 90;
                        const spent = document.spent || 0;
                        const budget = document.budgetAmount ? parseFloat(document.budgetAmount.toString()) : 0;

                        return (
                            <motion.div key={document.id} variants={itemVariants}>
                                <Card
                                    className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
                                    onClick={() => router.push(`/dashboard/documents/${document.id}`)}
                                >
                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-3">
                                            {document.department && (
                                                <DepartmentBadge department={document.department} />
                                            )}
                                            <StatusBadge status={document.status} type="dossier" />
                                        </div>
                                        <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                                            {document.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {document.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {client && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-muted-foreground">Client:</span>
                                                <span className="font-medium">{client.name}</span>
                                            </div>
                                        )}

                                        {document.referent && (
                                            <div className="flex items-center gap-2">
                                                <UserAvatar user={document.referent} size="sm" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium truncate">
                                                        {document.referent.firstName} {document.referent.lastName}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">Referent</div>
                                                </div>
                                            </div>
                                        )}

                                        {budget > 0 && (
                                            <div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-muted-foreground">Budget</span>
                                                    <span className={`font-semibold ${isOverBudget ? 'text-destructive' : ''}`}>
                                                        {progress.toFixed(0)}%
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={Math.min(progress, 100)}
                                                    className={`h-2 ${isOverBudget ? '[&>div]:bg-destructive' : ''}`}
                                                />
                                                <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                                                    <span>{spent.toLocaleString()} FCFA</span>
                                                    <span>{budget.toLocaleString()} FCFA</span>
                                                </div>
                                            </div>
                                        )}

                                        {document.tags && document.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {document.tags.slice(0, 3).map((tag: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs px-2 py-1 bg-muted rounded-md"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}

            {!loading && documents.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No documents found matching your filters.</p>
                </div>
            )}
        </div>
    );
};

export default page;