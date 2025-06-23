// pages/UserPage.tsx
import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { Toaster, toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { UserForm } from '@/features/user/UserForm';
import { PlusCircle } from 'lucide-react';
import { columns } from '@/features/user/column';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

export default function User() {
  const { users, fetchUsers, createAdmin } = useUserStore();
  const [openCreate, setOpenCreate] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  // 👇 Filter users BEFORE passing to DataTable
  const filteredUsers = useMemo(() => {
    if (roleFilter === "all") return users;
    return users.filter(user => user.role === roleFilter);
  }, [users, roleFilter]);

  return (
    <div className="p-4">
      <Toaster richColors position="top-right" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Users</h2>

        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-gray-300">
              <PlusCircle /> Create Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Admin</DialogTitle>
            </DialogHeader>
            <UserForm
              onSubmit={async (data) => {
                try {
                  await createAdmin(data.email, data.password);
                  toast.success('Admin created successfully');
                  setOpenCreate(false);
                } catch (err: any) {
                  toast.error(err.message || 'Failed to create admin');
                }
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* 🔽 Role Filter Dropdown */}
      <div className="mb-4">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="USER">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 👇 Only send filtered users */}
      <DataTable
        columns={columns()}
        data={filteredUsers}
        filterColumnKey="email"
      />
    </div>
  );
}
