"use client"

import { useState } from "react"
import { PenIcon, PlusIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer } from "@/components/ui/page-container"
import { PageTitle } from "@/components/ui/page-title"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "viewer"
  status: "active" | "inactive"
  avatarUrl?: string
}

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "usr_1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "admin",
      status: "active",
    },
    {
      id: "usr_2",
      name: "Bob Smith",
      email: "bob@example.com",
      role: "manager",
      status: "active",
    },
    {
      id: "usr_3",
      name: "Carol Williams",
      email: "carol@example.com",
      role: "viewer",
      status: "inactive",
    },
  ])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  const handleSaveEdit = (formData: FormData) => {
    if (!editingUser) return

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as "admin" | "manager" | "viewer"
    const status = formData.get("status") as "active" | "inactive"

    setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, name, email, role, status } : user)))

    setEditingUser(null)
  }

  const handleAddUser = (formData: FormData) => {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as "admin" | "manager" | "viewer"
    const status = formData.get("status") as "active" | "inactive"

    const newUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 15)}`,
      name,
      email,
      role,
      status,
    }

    setUsers([...users, newUser])
    setIsAddingUser(false)
  }

  const handleDeleteUser = () => {
    if (!userToDelete) return

    setUsers(users.filter((user) => user.id !== userToDelete))
    setUserToDelete(null)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "manager":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageTitle title="Users" description="Manage user access and permissions for your account" />
          <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <PlusIcon className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add User</DialogTitle>
                <DialogDescription>Add a new user to your account and set their permissions.</DialogDescription>
              </DialogHeader>
              <form action={handleAddUser} className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" placeholder="Full name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select name="role" defaultValue="viewer">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select name="status" defaultValue="active">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="submit">Add User</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader className="bg-muted/50 p-6">
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage users and their access to your account</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRoleColor(user.role)}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog
                          open={editingUser?.id === user.id}
                          onOpenChange={(open) => !open && setEditingUser(null)}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                              <PenIcon className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                              <DialogDescription>Update user details and permissions.</DialogDescription>
                            </DialogHeader>
                            <form action={handleSaveEdit} className="space-y-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="edit-name"
                                  name="name"
                                  defaultValue={editingUser?.name}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-email" className="text-right">
                                  Email
                                </Label>
                                <Input
                                  id="edit-email"
                                  name="email"
                                  type="email"
                                  defaultValue={editingUser?.email}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-role" className="text-right">
                                  Role
                                </Label>
                                <Select name="role" defaultValue={editingUser?.role}>
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="viewer">Viewer</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-status" className="text-right">
                                  Status
                                </Label>
                                <Select name="status" defaultValue={editingUser?.status}>
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Save changes</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog
                          open={userToDelete === user.id}
                          onOpenChange={(open) => !open && setUserToDelete(null)}
                        >
                          <Button variant="ghost" size="icon" onClick={() => setUserToDelete(user.id)}>
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the user {user.name} and remove their access to your
                                account.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

