"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/hooks/useStore';
import { DepartmentBadge } from '@/components/DepartmentBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { UserAvatar } from '@/components/UserAvatar';
import { SEED_USERS, DEPARTMENTS } from '@/lib/seed-data';
import { DossierStatus } from '@/lib/types';
import { hasPermission } from '@/lib/permissions';
import { useRouter } from 'next/navigation';

const Dossiers = () => {
    const { user } = useAuth();
    const { dossiers, clients } = useStore();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    if (!user || !hasPermission(user, 'dossier:view')) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">You don't have permission to view dossiers.</p>
            </div>
        );
    }

    // Filter dossiers
    const filteredDossiers = dossiers.filter(dossier => {
        const matchesSearch = dossier.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dossier.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = filterDepartment === 'all' || dossier.departmentId === filterDepartment;
        const matchesStatus = filterStatus === 'all' || dossier.status === filterStatus;
        const hasAccess = user.role === 'ADMIN' || user.role === 'ASSOCIATE' ||
            user.role === 'BOARD' || dossier.departmentId === user.departmentId;

        return matchesSearch && matchesDepartment && matchesStatus && hasAccess;
    });

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
                    <h1 className="text-4xl font-bold mb-2">Dossiers</h1>
                    <p className="text-muted-foreground">
                        Manage all your legal cases and matters
                    </p>
                </div>
                {hasPermission(user, 'dossier:create') && (
                    <Button>
                        <Plus className="h-4 w-4" />
                        New Dossier
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
                                placeholder="Search dossiers..."
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
                                {DEPARTMENTS.map(dept => (
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
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Dossiers Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {filteredDossiers.map((dossier) => {
                    const client = clients.find(c => c.id === dossier.clientId);
                    const referent = SEED_USERS.find(u => u.id === dossier.referentId);
                    const progress = (dossier.spent / dossier.budget) * 100;
                    const isOverBudget = progress > 90;

                    return (
                        <motion.div key={dossier.id} variants={itemVariants}>
                            <Card
                                className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
                                onClick={() => router.push(`/dashboard/dossiers/${dossier.id}`)}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-3">
                                        <DepartmentBadge departmentId={dossier.departmentId} />
                                        <StatusBadge status={dossier.status} type="dossier" />
                                    </div>
                                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                                        {dossier.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {dossier.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-muted-foreground">Client:</span>
                                        <span className="font-medium">{client?.name}</span>
                                    </div>

                                    {referent && (
                                        <div className="flex items-center gap-2">
                                            <UserAvatar user={referent} size="sm" />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium truncate">{referent.firstName}</div>
                                                <div className="text-xs text-muted-foreground">Referent</div>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-muted-foreground">Budget</span>
                                            <span className={`font-semibold ${isOverBudget ? 'text-destructive' : ''}`}>
                                                {progress.toFixed(0)}%
                                            </span>
                                        </div>
                                        {/* <Progress
                                            value={Math.min(progress, 100)}
                                            className={`h-2 ${isOverBudget ? '[&>div]:bg-destructive' : ''}`}
                                        /> */}
                                        <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                                            <span>{dossier.spent.toLocaleString()} FCFA</span>
                                            <span>{dossier.budget.toLocaleString()} FCFA</span>
                                        </div>
                                    </div>

                                    {dossier.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {dossier.tags.slice(0, 3).map((tag, idx) => (
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

            {filteredDossiers.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No dossiers found matching your filters.</p>
                </div>
            )}
        </div>
    );
};

export default Dossiers;
