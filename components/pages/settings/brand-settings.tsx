"use client"

import type React from "react"

import { useState } from "react"
import { useBrand } from "@/hooks/use-brand"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BrandLogo } from "@/components/layout/brand-logo"
import { toast } from "@/components/ui/use-toast"

export function BrandSettingsPage() {
  const { brand, updateBrand } = useBrand()
  const [formData, setFormData] = useState({
    name: brand.name,
    primaryColor: brand.primaryColor,
    secondaryColor: brand.secondaryColor,
    testModeColor: brand.testModeColor,
    liveModeColor: brand.liveModeColor,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateBrand(formData)
    toast({
      title: "Brand settings updated",
      description: "Your branding changes have been applied.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Brand Settings</h1>
        <p className="text-muted-foreground">Customize your payment dashboard appearance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Brand Identity</CardTitle>
          <CardDescription>Customize how your brand appears throughout the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Brand Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 rounded-l-md border-y border-l"
                      style={{ backgroundColor: formData.primaryColor }}
                    />
                    <Input
                      id="primaryColor"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleChange}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 rounded-l-md border-y border-l"
                      style={{ backgroundColor: formData.secondaryColor }}
                    />
                    <Input
                      id="secondaryColor"
                      name="secondaryColor"
                      value={formData.secondaryColor}
                      onChange={handleChange}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="testModeColor">Test Mode Color</Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 rounded-l-md border-y border-l"
                      style={{ backgroundColor: formData.testModeColor }}
                    />
                    <Input
                      id="testModeColor"
                      name="testModeColor"
                      value={formData.testModeColor}
                      onChange={handleChange}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="liveModeColor">Live Mode Color</Label>
                  <div className="flex mt-1">
                    <div
                      className="w-10 h-10 rounded-l-md border-y border-l"
                      style={{ backgroundColor: formData.liveModeColor }}
                    />
                    <Input
                      id="liveModeColor"
                      name="liveModeColor"
                      value={formData.liveModeColor}
                      onChange={handleChange}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Preview</Label>
              <div className="mt-2 p-4 border rounded-md">
                <div className="flex items-center justify-between">
                  <BrandLogo />
                  <div className="flex gap-2">
                    <Button size="sm" style={{ backgroundColor: formData.testModeColor }}>
                      Test Mode
                    </Button>
                    <Button variant="outline" size="sm">
                      Live Mode
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Save Brand Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

