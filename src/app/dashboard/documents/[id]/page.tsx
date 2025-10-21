"use client";
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, DollarSign, Clock, Users, Calendar, Tag, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { DepartmentBadge } from '@/components/DepartmentBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { UserAvatar, DocumentCreatorAvatar, DocumentResponsibleAvatar, UserAvatarStack } from '@/components/UserAvatar';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { User } from '@/lib/types';
import { useAuthStore } from '@/stores/useAuthStore';
import { DocumentsService } from '@/services/document.service';

interface DocumentDetailData {
  id: string;
  title: string;
  reference: string;
  description?: string;
  type: string;
  status: string;
  budgetAmount?: number;
  spent?: number;
  progress?: number;
  totalHours?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  client?: {
    id: string;
    name: string;
    email: string;
    companyName?: string;
  };
  department?: {
    id: string;
    name: string;
    colorHex: string;
  };
  creator?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  responsable?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  referent?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    position?: string;
  };
  lists: Array<{
    id: string;
    name: string;
    description?: string;
    status: string;
    dueDate?: string;
    tasks: Array<{
      id: string;
      title: string;
      description?: string;
      status: string;
      dueDate?: string;
      assignee?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
      };
      timeEntries: Array<{
        id: string;
        hoursSpent: number;
        description?: string;
        date: string;
        collaborator: {
          id: string;
          firstName: string;
          lastName: string;
        };
      }>;
    }>;
  }>;
  invoices: Array<{
    id: string;
    reference: string;
    amount: number;
    issueDate: string;
    dueDate?: string;
    paid: boolean;
  }>;
  files: Array<{
    id: string;
    name: string;
    mimeType: string;
    size: number;
    createdAt: string;
  }>;
}

const DocumentDetail = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuthStore();
  const [document, setDocument] = useState<DocumentDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const documentId = params.id as string;

  useEffect(() => {
    loadDocument();
  }, [documentId]);

  const loadDocument = async () => {
    try {
      setLoading(true);
      setError(null);
      const documentData = await DocumentsService.getById(documentId);
      setDocument(documentData);
    } catch (err) {
      console.error('Error loading document:', err);
      setError('Failed to load document');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 p-4 sm:p-6">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-muted rounded mb-4"></div>
          <div className="h-12 bg-muted rounded mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">{error || 'Document not found'}</p>
        <Button onClick={() => router.push('/dashboard/documents')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Documents
        </Button>
      </div>
    );
  }

  const budgetAmount = document.budgetAmount || 0;
  const spentAmount = document.spent || 0;
  const budgetProgress = budgetAmount > 0 ? (spentAmount / budgetAmount) * 100 : 0;
  const isOverBudget = budgetProgress > 90;

  // Calculate statistics
  const totalTasks = document.lists.flatMap(list => list.tasks).length;
  const completedTasks = document.lists.flatMap(list => list.tasks).filter(task => task.status === 'DONE').length;
  const pendingTasks = document.lists.flatMap(list => list.tasks).filter(task => task.status === 'PENDING').length;
  const totalInvoiced = document.invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidInvoices = document.invoices.filter(invoice => invoice.paid).length;

  // Get all collaborators from tasks and time entries
  const allCollaborators = [
    document.creator,
    document.responsable,
    document.referent,
    ...document.lists.flatMap(list =>
      list.tasks.flatMap(task => [
        task.assignee,
        ...task.timeEntries.map(entry => entry.collaborator)
      ])
    )
  ].filter((user, index, array) =>
    user && array.findIndex(u => u?.id === user.id) === index
  );

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard/documents')}
          className="mb-4 hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Documents
        </Button>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
                    {document.title}
                  </h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    Reference: {document.reference} • Type: {document.type}
                  </p>
                </div>
              </div>
              {/* <StatusBadge status={document.status as unknown as 'high' | 'low' | 'todo' | 'in_progress' | 'review' | 'completed' | 'active' | 'pending' | 'archived' | 'urgent' | 'medium'} type="document" /> */}
            </div>

            <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
              {document.description || 'No description provided.'}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {document.department && (
                <DepartmentBadge department={document.department} />
              )}
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Created {format(new Date(document.createdAt), 'MMM dd, yyyy')}
              </Badge>
              {document.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Client
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
              {document.client?.name || 'No Client'}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {document.client?.email || 'No email'}
            </p>
            {document.client?.companyName && (
              <p className="text-xs text-muted-foreground truncate">
                {document.client.companyName}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Budget Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${isOverBudget ? 'text-destructive' : ''}`}>
              {budgetProgress.toFixed(0)}%
            </div>
            <Progress
              value={Math.min(budgetProgress, 100)}
              className={`mt-2 h-2 ${isOverBudget ? '[&>div]:bg-destructive' : ''}`}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {spentAmount.toLocaleString()} FCFA / {budgetAmount.toLocaleString()} FCFA
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">
              {completedTasks}/{totalTasks}
            </div>
            <Progress
              value={totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}
              className="mt-2 h-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {pendingTasks} pending • {document.totalHours || 0}h total
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">
              {paidInvoices}/{document.invoices.length}
            </div>
            <Progress
              value={document.invoices.length > 0 ? (paidInvoices / document.invoices.length) * 100 : 0}
              className="mt-2 h-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {totalInvoiced.toLocaleString()} FCFA total
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs for detailed views */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks & Lists</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Team Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Creator */}
            {document.creator && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Created By
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentCreatorAvatar user={document.creator as User} />
                </CardContent>
              </Card>
            )}

            {/* Responsible */}
            {document.responsable && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Responsible
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentResponsibleAvatar user={document.responsable as User} />
                </CardContent>
              </Card>
            )}

            {/* Referent */}
            {document.referent && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Referent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <UserAvatar user={document.referent as unknown as unknown as User} size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold truncate">
                        {document.referent.firstName} {document.referent.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {document.referent.email}
                      </div>
                      {document.referent.position && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {document.referent.position}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Collaborators */}
          {allCollaborators.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team Collaborators ({allCollaborators.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UserAvatarStack
                  users={allCollaborators.filter(Boolean) as unknown as User[] || []}
                  limit={8}
                  size="md"
                  className="justify-start"
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Task Lists</CardTitle>
              <CardDescription>
                {document.lists.length} lists with {totalTasks} total tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {document.lists.map((list) => {
                  const listTasks = list.tasks;
                  const completedListTasks = listTasks.filter(task => task.status === 'DONE').length;
                  const listProgress = listTasks.length > 0 ? (completedListTasks / listTasks.length) * 100 : 0;

                  return (
                    <motion.div
                      key={list.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer"
                      onClick={() => router.push(`/dashboard/lists/${list.id}`)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold truncate">{list.name}</h4>
                            {/* <StatusBadge status={list.status as unknown as 'high' | 'low' | 'todo' | 'in_progress' | 'review' | 'completed' | 'active' | 'pending' | 'archived' | 'urgent' | 'medium'} type="document" /> */}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {list.description || 'No description'}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {listTasks.length} tasks
                        </Badge>
                      </div>

                      {listTasks.length > 0 && (
                        <>
                          <div className="flex items-center justify-between mb-3">
                            <UserAvatarStack
                              users={listTasks.map(task => task.assignee).filter(Boolean) as unknown as User[] || []}
                              limit={4}
                              size="sm"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{listProgress.toFixed(0)}%</span>
                            </div>
                            <Progress value={Math.min(listProgress, 100)} className="h-2" />
                            <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                              <span>{completedListTasks} completed</span>
                              <span>{listTasks.length} total</span>
                            </div>
                          </div>
                        </>
                      )}

                      {listTasks.length === 0 && (
                        <div className="text-center py-4 text-muted-foreground text-sm">
                          No tasks in this list
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {document.lists.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No task lists yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>
                {document.invoices.length} invoices • {totalInvoiced.toLocaleString()} FCFA total
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {document.invoices.map((invoice) => (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${invoice.paid ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold">{invoice.reference}</div>
                        <div className="text-sm text-muted-foreground">
                          Issued: {format(new Date(invoice.issueDate), 'MMM dd, yyyy')}
                          {invoice.dueDate && ` • Due: ${format(new Date(invoice.dueDate), 'MMM dd, yyyy')}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">
                        {invoice.amount.toLocaleString()} FCFA
                      </div>
                      <Badge variant={invoice.paid ? "default" : "secondary"}>
                        {invoice.paid ? 'Paid' : 'Pending'}
                      </Badge>
                    </div>
                  </motion.div>
                ))}

                {document.invoices.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No invoices yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
              <CardDescription>
                {document.files.length} files attached to this document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {document.files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-md transition-all"
                  >
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{file.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {file.mimeType} • {(file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(file.createdAt), 'MMM dd, yyyy')}
                    </div>
                  </motion.div>
                ))}

                {document.files.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No files attached
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentDetail;