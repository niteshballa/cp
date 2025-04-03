"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required" }),
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Confirm password is required" })
    .refine((data) => data === data.newPassword, {
      message: "Passwords do not match",
    }),
})

export function SecuritySettings() {
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: z.infer<typeof passwordFormSchema>) {
    // In a real app, this would update the user's password
    console.log(values)
    alert("Password updated successfully!")
    form.reset()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>Password must be at least 8 characters long</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">Update Password</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
            </div>
            <Switch id="2fa" />
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Two-factor authentication adds an extra layer of security to your account by requiring more than just a
            password to sign in.
          </p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Login Sessions</CardTitle>
          <CardDescription>Manage your active sessions and devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Chrome on Windows</p>
                <p className="text-sm text-muted-foreground">Active now • Last active: Just now</p>
              </div>
              <Button variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Safari on iPhone</p>
                <p className="text-sm text-muted-foreground">Last active: 2 days ago</p>
              </div>
              <Button variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" size="sm">
            Sign Out All Devices
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

