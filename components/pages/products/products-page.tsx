"use client"

import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ProductsPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-8 w-[200px]" />
            </div>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <div className="aspect-video w-full bg-muted rounded-t-lg"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Product {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="font-medium">${(19.99 * i).toFixed(2)}</span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}

