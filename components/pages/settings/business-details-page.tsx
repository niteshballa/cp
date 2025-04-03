"use client"

import { useState } from "react"
import { Building, Mail, Phone, MapPin, Globe, PenIcon } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"

export function BusinessDetailsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [businessDetails, setBusinessDetails] = useState({
    name: "Acme Inc.",
    email: "contact@acmeinc.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
    website: "https://acmeinc.com",
    description: "Leading provider of payment processing solutions for businesses of all sizes.",
  })

  const handleSave = (formData: FormData) => {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const website = formData.get("website") as string
    const description = formData.get("description") as string

    setBusinessDetails({
      name,
      email,
      phone,
      address,
      website,
      description,
    })

    setIsEditing(false)
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <PageTitle title="Business Details" description="View and manage your business information" />

        <Card className="overflow-hidden border bg-card text-card-foreground shadow">
          <CardHeader className="flex flex-row items-center justify-between bg-muted/50 p-6">
            <div className="space-y-1.5">
              <CardTitle className="text-2xl font-bold">{businessDetails.name}</CardTitle>
              <CardDescription>Business Information</CardDescription>
            </div>
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <PenIcon className="h-4 w-4" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Edit Business Details</DialogTitle>
                  <DialogDescription>Update your business information. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <form action={handleSave} className="space-y-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Business Name
                    </Label>
                    <Input id="name" name="name" defaultValue={businessDetails.name} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={businessDetails.email}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input id="phone" name="phone" defaultValue={businessDetails.phone} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="website" className="text-right">
                      Website
                    </Label>
                    <Input id="website" name="website" defaultValue={businessDetails.website} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      defaultValue={businessDetails.address}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={businessDetails.description}
                      className="col-span-3"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{businessDetails.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{businessDetails.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{businessDetails.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Website</p>
                  <p className="text-sm text-muted-foreground">{businessDetails.website}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">{businessDetails.description}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

