"use client";
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, DollarSign, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/hooks/useStore';
import { useAuth } from '@/hooks/useAuth';
import { DepartmentBadge } from '@/components/DepartmentBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { UserAvatar } from '@/components/UserAvatar';
import { SEED_USERS } from '@/lib/seed-data';
import { useParams, useRouter } from 'next/navigation';



const DossierDetail = () => {
    const router = useRouter();
    const params = useParams()
    const { user } = useAuth();
    const { getDossierById, getCasesByDossierId, clients, getInvoicesByDossierId } = useStore();

    const dossierId = params.id as string;
    const dossier = getDossierById(dossierId);
    const cases = getCasesByDossierId(dossierId);
    const client = dossier ? clients.find(c => c.id === dossier.clientId) : null;
    const referent = dossier ? SEED_USERS.find(u => u.id === dossier.referentId) : null;
    const invoices = getInvoicesByDossierId(dossierId);

    if (!dossier || !user) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">Dossier not found</p>
            </div>
        );
    }

    const budgetProgress = (dossier.spent / dossier.budget) * 100;

    return (
        <div className="space-y-6 p-4 sm:p-6">
            {/* Header */}
            <div>
                <Button
                    variant="ghost"
                    onClick={() => router.push('/dashboard/dossiers')}
                    className="mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dossiers
                </Button>

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
                                {dossier.title}
                            </h1>
                            <StatusBadge status={dossier.status} type="dossier" />
                        </div>
                        <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                            {dossier.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <DepartmentBadge departmentId={dossier.departmentId} />
                            {dossier.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-xs px-2 py-1 bg-muted rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Client
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
                            {client?.name}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{client?.email}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Budget Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                            {budgetProgress.toFixed(0)}%
                        </div>
                        {/* <Progress value={Math.min(budgetProgress, 100)} className="mt-2 h-2" /> */}
                        <p className="text-xs text-muted-foreground mt-1">
                            {dossier.spent.toLocaleString()} FCFA / {dossier.budget.toLocaleString()} FCFA
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Cases
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                            {cases.filter(c => c.status === 'active').length}
                        </div>
                        <p className="text-xs text-muted-foreground">of {cases.length} total</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Invoices
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold">{invoices.length}</div>
                        <p className="text-xs text-muted-foreground">
                            {invoices.reduce((sum, inv) => sum + inv.total, 0).toLocaleString()} FCFA total
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Referent */}
            {referent && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Referent lawyer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <UserAvatar user={referent} size="lg" />
                            <div className="min-w-0 flex-1">
                                <div className="font-semibold truncate">{referent.name}</div>
                                <div className="text-sm text-muted-foreground truncate">{referent.email}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {referent.role.toUpperCase()} • {referent.hourlyRate} FCFA/hr
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Cases */}
            <Card>
                <CardHeader>
                    <CardTitle>Cases</CardTitle>
                    <CardDescription>All cases under this dossier</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cases.map((caseItem) => {
                            const caseProgress = (caseItem.spent / caseItem.budget) * 100;
                            const assignees = caseItem.assignees
                                .map(id => SEED_USERS.find(u => u.id === id))
                                .filter(Boolean);

                            return (
                                <motion.div
                                    key={caseItem.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer"
                                    onClick={() => router.push(`/dashboard/cases/${caseItem.id}`)}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold mb-1 truncate">{caseItem.title}</h4>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {caseItem.description}
                                            </p>
                                        </div>
                                        <StatusBadge status={caseItem.status} type="dossier" />
                                    </div>

                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex -space-x-2">
                                            {assignees.map((assignee) => (
                                                assignee && (
                                                    <UserAvatar
                                                        key={assignee.id}
                                                        user={assignee}
                                                        size="sm"
                                                        className="ring-2 ring-background"
                                                    />
                                                )
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-muted-foreground">Budget</span>
                                            <span className="font-medium">{caseProgress.toFixed(0)}%</span>
                                        </div>
                                        {/* <Progress value={Math.min(caseProgress, 100)} className="h-2" /> */}
                                        <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                                            <span>{caseItem.spent.toLocaleString()} FCFA</span>
                                            <span>{caseItem.budget.toLocaleString()} FCFA</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {cases.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No cases yet
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DossierDetail;