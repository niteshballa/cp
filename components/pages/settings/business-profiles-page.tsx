"use client"

import { useState } from "react"
import { PenIcon, CopyIcon, PlusIcon } from "lucide-react"
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

type BusinessProfile = {
  id: string
  name: string
  country: string
  currency: string
  status: "active" | "inactive"
}

export function BusinessProfilesPage() {
  const [profiles, setProfiles] = useState<BusinessProfile[]>([
    {
      id: "pro_NVOK8Tv6E1b0tsHnKF8M",
      name: "Default",
      country: "United States",
      currency: "USD",
      status: 'active"e',
    },
  ])
  const [editingProfile, setEditingProfile] = useState<BusinessProfile | null>(null)
  const [isAddingProfile, setIsAddingProfile] = useState(false)

  const handleEdit = (profile: BusinessProfile) => {
    setEditingProfile(profile)
  }

  const handleSaveEdit = (formData: FormData) => {
    if (!editingProfile) return

    const name = formData.get("name") as string
    const country = formData.get("country") as string
    const currency = formData.get("currency") as string
    const status = formData.get("status") as "active" | "inactive"

    setProfiles(
      profiles.map((profile) =>
        profile.id === editingProfile.id ? { ...profile, name, country, currency, status } : profile,
      ),
    )

    setEditingProfile(null)
  }

  const handleAddProfile = (formData: FormData) => {
    const name = formData.get("name") as string
    const country = formData.get("country") as string
    const currency = formData.get("currency") as string
    const status = formData.get("status") as "active" | "inactive"

    const newProfile: BusinessProfile = {
      id: `pro_${Math.random().toString(36).substring(2, 15)}`,
      name,
      country,
      currency,
      status,
    }

    setProfiles([...profiles, newProfile])
    setIsAddingProfile(false)
  }

  const handleCopy = (id: string) => {
    const profileToCopy = profiles.find((profile) => profile.id === id)
    if (!profileToCopy) return

    const newProfile: BusinessProfile = {
      ...profileToCopy,
      id: `pro_${Math.random().toString(36).substring(2, 15)}`,
      name: `${profileToCopy.name} (Copy)`,
    }

    setProfiles([...profiles, newProfile])
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageTitle
            title="Business Profiles"
            description="Add and manage profiles to represent different businesses across countries"
          />
          <Dialog open={isAddingProfile} onOpenChange={setIsAddingProfile}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <PlusIcon className="h-4 w-4" />
                Add Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add Business Profile</DialogTitle>
                <DialogDescription>
                  Create a new business profile for a different region or business entity.
                </DialogDescription>
              </DialogHeader>
              <form action={handleAddProfile} className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Profile Name
                  </Label>
                  <Input id="name" name="name" placeholder="e.g. Europe Business" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">
                    Country
                  </Label>
                  <Input id="country" name="country" placeholder="e.g. Germany" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="currency" className="text-right">
                    Currency
                  </Label>
                  <Input id="currency" name="currency" placeholder="e.g. EUR" className="col-span-3" required />
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
                  <Button type="submit">Add Profile</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader className="bg-muted/50 p-6">
            <CardTitle>Business Profiles</CardTitle>
            <CardDescription>Manage your business profiles across different regions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Profile ID</TableHead>
                  <TableHead>Profile Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile, index) => (
                  <TableRow key={profile.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-mono text-xs">{profile.id}</TableCell>
                    <TableCell>{profile.name}</TableCell>
                    <TableCell>{profile.country}</TableCell>
                    <TableCell>{profile.currency}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          profile.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {profile.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog
                          open={editingProfile?.id === profile.id}
                          onOpenChange={(open) => !open && setEditingProfile(null)}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(profile)}>
                              <PenIcon className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                              <DialogTitle>Edit Business Profile</DialogTitle>
                              <DialogDescription>Update your business profile details.</DialogDescription>
                            </DialogHeader>
                            <form action={handleSaveEdit} className="space-y-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                  Profile Name
                                </Label>
                                <Input
                                  id="edit-name"
                                  name="name"
                                  defaultValue={editingProfile?.name}
                                  className="col-span-3"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-country" className="text-right">
                                  Country
                                </Label>
                                <Input
                                  id="edit-country"
                                  name="country"
                                  defaultValue={editingProfile?.country}
                                  className="col-span-3"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-currency" className="text-right">
                                  Currency
                                </Label>
                                <Input
                                  id="edit-currency"
                                  name="currency"
                                  defaultValue={editingProfile?.currency}
                                  className="col-span-3"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-status" className="text-right">
                                  Status
                                </Label>
                                <Select name="status" defaultValue={editingProfile?.status}>
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
                        <Button variant="ghost" size="icon" onClick={() => handleCopy(profile.id)}>
                          <CopyIcon className="h-4 w-4" />
                          <span className="sr-only">Copy</span>
                        </Button>
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

