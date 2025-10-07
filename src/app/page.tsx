"use client"

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Scale, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { SEED_USERS } from '@/lib/seed-data';
import { DepartmentBadge } from '@/components/DepartmentBadge';
import { useRouter } from 'next/navigation';
import { UserAvatar } from '@/components/UserAvatar';

const Login = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    if (selectedUserId) {
      login(selectedUserId);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img
            src="/Logo blue.png"
            alt="logo"
            className="inline-flex items-center justify-center w-[120px] h-[100px] p-1 bg-card rounded-full mb-4 shadow-lg object-contain"
          />
          <h1 className="text-3xl font-bold mb-2">Cabinet D'Avocat D. HAPPI</h1>
          <p className="text-muted-foreground">Select a user to continue</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Selection
            </CardTitle>
            <CardDescription>
              Choose a user to simulate authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a user..." />
              </SelectTrigger>
              <SelectContent>
                {SEED_USERS.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex items-center gap-3">
                      <UserAvatar user={user} size="sm" />
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </div>
                      </div>
                      <DepartmentBadge departmentId={user.departmentId} />
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedUserId && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-muted rounded-lg"
              >
                {(() => {
                  const user = SEED_USERS.find(u => u.id === selectedUserId);
                  return user ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <UserAvatar user={user} />
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <DepartmentBadge departmentId={user.departmentId} />
                        <span className="text-xs bg-background px-2 py-1 rounded border">
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ) : null;
                })()}
              </motion.div>
            )}

            <Button
              onClick={handleLogin}
              disabled={!selectedUserId}
              className="w-full"
              size="lg"
            >
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Demo authentication • All data is for test purpose only. Built by <span className='text-blue-500'>NMD</span>.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
